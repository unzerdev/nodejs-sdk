import * as apiURL from '../configs/ApiUrls'
import PaymentService from './PaymentService'
import Linkpay from '../payments/paypage/Linkpay'
import ResponseLinkpayMapper from './mappers/ResponseLinkpayMapper'

export default (linkpayIdOrAlias: string, linkpay: Linkpay, paymentService: PaymentService): Promise<Linkpay> => {
  return new Promise(async (resolve, reject) => {    
    try {
      // Call api end point to get response
      const response: any = await paymentService
        .getRequestAdapter()
        .put(
          `${apiURL.URL_LINKPAY}/${linkpayIdOrAlias}`,
          linkpay.getPayload(),
          paymentService.getHeidelpay().getPrivateKey()
        )

      // Map returned values to new Linkpay instance
      const updatedLinkpay: Linkpay = ResponseLinkpayMapper(response, linkpay)

      // Set Unzer instance
      updatedLinkpay.setHeidelpay(paymentService.getHeidelpay())

      // Reset payload obj to empty obj
      updatedLinkpay.resetPayload()

      // Resolve final result
      resolve(updatedLinkpay)
    } catch (error) {
      // Reject with error object
      reject(error)
    }
  })
}
