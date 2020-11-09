import * as apiURL from '../configs/ApiUrls'
import PaymentService from './PaymentService'
import HirePurchasePlan from '../payments/types/HirePurchasePlan'
import ResponseErrorsMapper from './mappers/ResponseErrorsMapper'

export default (amount: string, currency: string, effectiveInterestRate: string, orderDate: string, paymentService: PaymentService): Promise<Array<HirePurchasePlan>> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Call api end point to get response
      const response: any = await paymentService
        .getRequestAdapter()
        .get(
          `${apiURL.URL_TYPE_HIRE_PURCHASE_PLANS}/?amount=${amount}&currency=${currency}&effectiveInterest=${effectiveInterestRate}&orderDate=${orderDate}`, 
          paymentService.getUnzer().getPrivateKey()
        )
        
      // Handle errors response
      if (response.errors) {
        return reject(ResponseErrorsMapper(response))
      }

      const hirepurchasePlansList: Array<HirePurchasePlan> = []

      response.entity.map((item:any) => {
        // Create new instance Unzer
        const hirePurchasePlan = new HirePurchasePlan()  

        // Set values foreach property
        hirePurchasePlan.setNumberOfRates(item.numberOfRates)
        hirePurchasePlan.setDayOfPurchase(item.dayOfPurchase)
        hirePurchasePlan.setOrderDate(item.orderDate)
        hirePurchasePlan.setTotalPurchaseAmount(item.totalPurchaseAmount)
        hirePurchasePlan.setTotalInterestAmount(item.totalInterestAmount)
        hirePurchasePlan.setTotalAmount(item.totalAmount)
        hirePurchasePlan.setEffectiveInterestRate(item.effectiveInterestRate)
        hirePurchasePlan.setNominalInterestRate(item.nominalInterestRate)
        hirePurchasePlan.setFeeFirstRate(item.feeFirstRate)
        hirePurchasePlan.setFeePerRate(item.feePerRate)
        hirePurchasePlan.setMonthlyRate(item.monthlyRate)
        hirePurchasePlan.setLastRate(item.lastRate)

        // Add hirepurchase item to plan list
        hirepurchasePlansList.push(hirePurchasePlan)
      })

      // Resolve final result
      resolve(hirepurchasePlansList)
    } catch (error) {
      // Reject with error object
      reject(error)
    }
  })
}
