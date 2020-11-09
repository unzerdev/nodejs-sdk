import * as apiURL from '../configs/ApiUrls'
import PaymentService from './PaymentService'
import HirePurchase, { updateHirePurchaseObject} from '../payments/types/HirePurchase'

export default (hirePurchaseId: string, args: updateHirePurchaseObject, paymentService: PaymentService): Promise<HirePurchase> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Call api end point to get response
      let payload: any = {}
      const { iban, bic, accountHolder, invoiceDate, invoiceDueDate } = args

      if (iban) {
        payload.iban = iban
      }

      if (bic) {
        payload.bic = bic
      }

      if (accountHolder) {
        payload.accountHolder = accountHolder
      }

      if (invoiceDate) {
        payload.invoiceDate = invoiceDate
      }

      if (invoiceDueDate) {
        payload.invoiceDueDate = invoiceDueDate
      }

      const response: any = await paymentService
        .getRequestAdapter()
        .put(
          `${apiURL.URL_TYPE_HIRE_PURCHASE}/${hirePurchaseId}`,
          payload,
          paymentService.getUnzer().getPrivateKey()
        )

      const hirePurchase = new HirePurchase()

      hirePurchase.setIban(response.iban)
      hirePurchase.setBic(response.bic)
      hirePurchase.setAccountHolder(response.accountHolder)
      hirePurchase.setInvoiceDate(response.invoiceDate)
      hirePurchase.setInvoiceDueDate(response.invoiceDueDate)
      hirePurchase.setNumberOfRates(response.numberOfRates)
      hirePurchase.setDayOfPurchase(response.dayOfPurchase)
      hirePurchase.setOrderDate(response.orderDate)
      hirePurchase.setTotalPurchaseAmount(response.totalPurchaseAmount)
      hirePurchase.setTotalInterestAmount(response.totalInterestAmount)
      hirePurchase.setTotalAmount(response.totalAmount)
      hirePurchase.setEffectiveInterestRate(response.effectiveInterestRate)
      hirePurchase.setNominalInterestRate(response.nominalInterestRate)
      hirePurchase.setFeeFirstRate(response.feeFirstRate)
      hirePurchase.setFeePerRate(response.feePerRate)
      hirePurchase.setMonthlyRate(response.monthlyRate)
      hirePurchase.setLastRate(response.lastRate)

      // Resolve final result
      resolve(hirePurchase)    } catch (error) {
      // Reject with error object
      reject(error)
    }
  })
}