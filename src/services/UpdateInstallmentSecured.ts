import * as apiURL from '../configs/ApiUrls'
import PaymentService from './PaymentService'
import InstallmentSecured, { updateInstallmentSecuredObject} from '../payments/types/InstallmentSecured'

export default (installmentSecuredId: string, args: updateInstallmentSecuredObject, paymentService: PaymentService): Promise<InstallmentSecured> => {
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
          `${apiURL.URL_TYPE_INSTALLMENT_SECURED}/${installmentSecuredId}`,
          payload,
          paymentService.getUnzer().getPrivateKey()
        )

      const installmentSecured = new InstallmentSecured()

      installmentSecured.setIban(response.iban)
      installmentSecured.setBic(response.bic)
      installmentSecured.setAccountHolder(response.accountHolder)
      installmentSecured.setInvoiceDate(response.invoiceDate)
      installmentSecured.setInvoiceDueDate(response.invoiceDueDate)
      installmentSecured.setNumberOfRates(response.numberOfRates)
      installmentSecured.setDayOfPurchase(response.dayOfPurchase)
      installmentSecured.setOrderDate(response.orderDate)
      installmentSecured.setTotalPurchaseAmount(response.totalPurchaseAmount)
      installmentSecured.setTotalInterestAmount(response.totalInterestAmount)
      installmentSecured.setTotalAmount(response.totalAmount)
      installmentSecured.setEffectiveInterestRate(response.effectiveInterestRate)
      installmentSecured.setNominalInterestRate(response.nominalInterestRate)
      installmentSecured.setFeeFirstRate(response.feeFirstRate)
      installmentSecured.setFeePerRate(response.feePerRate)
      installmentSecured.setMonthlyRate(response.monthlyRate)
      installmentSecured.setLastRate(response.lastRate)

      // Resolve final result
      resolve(installmentSecured)    } catch (error) {
      // Reject with error object
      reject(error)
    }
  })
}