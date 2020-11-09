import PaymentService from './PaymentService'
import * as apiURL from '../configs/ApiUrls'
import Webhook, { webhookObject } from '../payments/business/Webhook'
import ResponseErrorsMapper from './mappers/ResponseErrorsMapper'

export default (args: webhookObject, paymentService: PaymentService): Promise<Webhook> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { url, event, eventList } = args
      let payload: any = {url}

      if (event) {
        payload.event = event
      }

      if (eventList) {
        payload.eventList = eventList
      }

      const response: any = await paymentService
        .getRequestAdapter()
        .post(
          apiURL.URL_WEBHOOK,
          payload,
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
      return reject(error)
    }
  })
}