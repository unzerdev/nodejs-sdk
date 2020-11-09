import PaymentService from './PaymentService'
import * as apiURL from '../configs/ApiUrls'
import Webhook from '../payments/business/Webhook'
import ResponseErrorsMapper from './mappers/ResponseErrorsMapper'

export default (paymentService: PaymentService, webhookId?: string): Promise<Webhook> => {
  return new Promise(async (resolve, reject) => {
    const endpoint = webhookId ? `${apiURL.URL_WEBHOOK}/${webhookId}` : apiURL.URL_WEBHOOK
    try {
      const response: any = await paymentService
        .getRequestAdapter()
        .delete(
          endpoint,
          {},
          paymentService.getUnzer().getPrivateKey()
        )

      if (response.errors) {
        return reject(ResponseErrorsMapper(response))
      }
      
      if (response.events) {
        resolve(response.events)
      } else {
        resolve(response.id)
      }
    } catch (error) {
      reject(error)
    }
  })
}
