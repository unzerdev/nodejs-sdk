import * as apiURL from '../configs/ApiUrls'
import PaymentService from './PaymentService'
import Linkpay from '../payments/paypage/Linkpay'
import ResponseErrorsMapper from './mappers/ResponseErrorsMapper'
import ResponseLinkpayMapper from './mappers/ResponseLinkpayMapper'

export default (linkpay: Linkpay, type: string, paymentService: PaymentService): Promise<Linkpay> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Call api end point to get response
      const response: any = await paymentService
        .getRequestAdapter()
        .post(
          type === 'authorize' ? apiURL.URL_LINKPAY_AUTHORIZE : apiURL.URL_LINKPAY_CHARGE,
          linkpay.getPayload(),
          paymentService.getHeidelpay().getPrivateKey()
        )

      // Handle errors response    
      if (response.errors) {
        return reject(ResponseErrorsMapper(response))
      }

      // Map returned values to new Linkpay instance
      const newLinkpay: Linkpay = ResponseLinkpayMapper(response, linkpay)

      // Set Unzer instance
      newLinkpay.setHeidelpay(paymentService.getHeidelpay())

      // Reset payload obj to empty obj
      newLinkpay.resetPayload()

      // Resolve final result
      resolve(newLinkpay)
    } catch (error) {
      // Reject with error object
      return reject(error)
    }
  })
}
