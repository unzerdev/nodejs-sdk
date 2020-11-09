import PaymentService from './PaymentService'
import * as apiURL from '../configs/ApiUrls'
import Webhook from '../payments/business/Webhook'
import ResponseErrorsMapper from './mappers/ResponseErrorsMapper'

export default (webhookId: string, args: any, paymentService: PaymentService): Promise<Webhook> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { url } = args
      let payload: any = {}

      if (url) {
        payload.url = url
      }

      const response: any = await paymentService
        .getRequestAdapter()
        .put(
          `${apiURL.URL_WEBHOOK}/${webhookId}`,
          payload,
          paymentService.getUnzer().getPrivateKey()
        )

      if (response.errors) {
        return reject(ResponseErrorsMapper(response))
      }

      let webhook = new Webhook(paymentService.getUnzer())
      webhook.setUrl(response.url)
      webhook.setEvent(response.event)
      webhook.setId(response.id)

      resolve(webhook)
    } catch (error) {
      reject(error)
    }
  })
}
