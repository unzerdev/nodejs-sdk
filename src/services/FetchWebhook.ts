import PaymentService from './PaymentService'
import * as apiURL from '../configs/ApiUrls'
import Webhook, { webhookObject } from '../payments/business/Webhook'
import ResponseErrorsMapper from './mappers/ResponseErrorsMapper'

export default (paymentService: PaymentService, webhookId?: string): Promise<Webhook> => {
  return new Promise(async (resolve, reject) => {
    const endpoint = webhookId ? `${apiURL.URL_WEBHOOK}/${webhookId}` : apiURL.URL_WEBHOOK
    try {
      const response: any = await paymentService
        .getRequestAdapter()
        .get(
          endpoint,
          paymentService.getUnzer().getPrivateKey()
          )
      
      if (response.errors) {
        return reject(ResponseErrorsMapper(response))
      }

      let webhook = new Webhook(paymentService.getUnzer())

      if (response.events) {
        webhook.setEventList(response.events)
      } else {
        webhook.setUrl(response.url)
        webhook.setEvent(response.event)
        webhook.setId(response.id)
      }

      resolve(webhook)
    } catch (error) {
      reject(error)
    }
  })
}