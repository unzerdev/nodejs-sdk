import * as apiURL from '../configs/ApiUrls'
import PaymentService from './PaymentService'

export default (customerId: string, paymentService: PaymentService): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Call api end point to get response
      const response: any = await paymentService
      .getRequestAdapter()
      .delete(
        `${apiURL.URL_CUSTOMER}/${customerId}`, 
        {}, // send empty body when call delete customer
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
