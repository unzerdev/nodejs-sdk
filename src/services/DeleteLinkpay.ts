import * as apiURL from '../configs/ApiUrls'
import PaymentService from './PaymentService'

export default (linkpayIdOrAlias: string, paymentService: PaymentService): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Call api end point to get response
      const response: any = await paymentService
        .getRequestAdapter()
        .delete(
          `${apiURL.URL_LINKPAY}/${linkpayIdOrAlias}`,
          {}, // send empty body when call delete method
          paymentService.getUnzer().getPrivateKey()
        )
        
      // Resolve final result
      resolve(response)
    } catch (error) {
      // Reject with error object
      reject(error)
    }
  })
}
