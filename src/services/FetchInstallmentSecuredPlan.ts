import * as apiURL from '../configs/ApiUrls'
import PaymentService from './PaymentService'
import InstallmentSecuredPlan from '../payments/types/InstallmentSecuredPlan'
import ResponseErrorsMapper from './mappers/ResponseErrorsMapper'

export default (amount: string, currency: string, effectiveInterestRate: string, orderDate: string, paymentService: PaymentService): Promise<Array<InstallmentSecuredPlan>> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Call api end point to get response
      const response: any = await paymentService
        .getRequestAdapter()
        .get(
          `${apiURL.URL_TYPE_INSTALLMENT_SECURED_PLANS}/?amount=${amount}&currency=${currency}&effectiveInterest=${effectiveInterestRate}&orderDate=${orderDate}`, 
          paymentService.getUnzer().getPrivateKey()
        )
        
      // Handle errors response
      if (response.errors) {
        return reject(ResponseErrorsMapper(response))
      }

      const installmentSecuredPlansList: Array<InstallmentSecuredPlan> = []

      response.entity.map((item:any) => {
        // Create new instance Unzer
        const installmentSecuredPlan = new InstallmentSecuredPlan()  

        // Set values foreach property
        installmentSecuredPlan.setNumberOfRates(item.numberOfRates)
        installmentSecuredPlan.setDayOfPurchase(item.dayOfPurchase)
        installmentSecuredPlan.setOrderDate(item.orderDate)
        installmentSecuredPlan.setTotalPurchaseAmount(item.totalPurchaseAmount)
        installmentSecuredPlan.setTotalInterestAmount(item.totalInterestAmount)
        installmentSecuredPlan.setTotalAmount(item.totalAmount)
        installmentSecuredPlan.setEffectiveInterestRate(item.effectiveInterestRate)
        installmentSecuredPlan.setNominalInterestRate(item.nominalInterestRate)
        installmentSecuredPlan.setFeeFirstRate(item.feeFirstRate)
        installmentSecuredPlan.setFeePerRate(item.feePerRate)
        installmentSecuredPlan.setMonthlyRate(item.monthlyRate)
        installmentSecuredPlan.setLastRate(item.lastRate)

        // Add installmentSecured item to plan list
        installmentSecuredPlansList.push(installmentSecuredPlan)
      })

      // Resolve final result
      resolve(installmentSecuredPlansList)
    } catch (error) {
      // Reject with error object
      reject(error)
    }
  })
}
