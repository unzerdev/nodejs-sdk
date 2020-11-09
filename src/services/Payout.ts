import * as apiURL from '../configs/ApiUrls'
import PaymentService from './PaymentService'
import FetchPayment from './FetchPayment'
import Payout, { payoutObject } from '../payments/business/Payout'
import ResponseErrorsMapper from './mappers/ResponseErrorsMapper'

export default (args: payoutObject, paymentService: PaymentService): Promise<Payout> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { amount, orderId, paymentReference, currency, typeId, customerId, returnUrl, metadataId } = args
      let payload: any = {
        amount: amount,
        currency: currency,
        returnUrl: returnUrl,
        resources: {
          typeId: typeId
        }
      }

      // Add order Id into payload if its passed
      if (orderId) {
        payload.orderId = orderId
      }

      // Add payment reference into payload if its passed
      if (paymentReference) {
        payload.paymentReference = paymentReference
      }

      // Add customer Id into payload if its passed
      if (customerId) {
        payload.resources.customerId = customerId
      }

      // Add metadta Id into payload if its passed
      if (metadataId) {
        payload.resources.metadataId = metadataId
      }

      // Call api end point to get response
      const response: any = await paymentService
        .getRequestAdapter()
        .post(
          apiURL.URL_PAYMENT_PAYOUT,
          payload,
          paymentService.getUnzer().getPrivateKey()
        )

      if (response.errors) {
        return reject(ResponseErrorsMapper(response))
      }

      // New Authorize with Hedeipay instance
      let payout = new Payout(paymentService.getUnzer())

      // Set payout Id
      payout.setId(response.id)

      // Set amount
      payout.setAmount(response.amount)

      // Set order Id
      if(response.orderId) {
        payout.setOrderId(response.orderId)
      }

      // Set payment reference
      if(response.paymentReference) {
        payout.setPaymentReference(response.paymentReference)
      }

      // Set currency
      payout.setCurrency(response.currency)

      // Set return URL
      payout.setReturnUrl(response.returnUrl)

      // Set resources
      payout.setResources(response.resources)

      // Set payment object
      payout.setPayment(await FetchPayment(response.resources.paymentId, paymentService))

      // Set Payload
      payout.setPayload(response)

      // Resolve final result
      resolve(payout)
    } catch (error) {
      // Reject with error object
      return reject(error)
    }
  })
}
