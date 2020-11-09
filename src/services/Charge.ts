import * as apiURL from '../configs/ApiUrls'
import PaymentService from './PaymentService'
import Charge, { chargeObject } from '../payments/business/Charge'
import FetchPayment from './FetchPayment';
import ResponseErrorsMapper from './mappers/ResponseErrorsMapper'

export default (args: chargeObject, paymentService: PaymentService): Promise<Charge> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { amount, orderId, invoiceId, currency, returnUrl, paymentReference, customerId, typeId, metadataId, card3ds, basketId } = args
      const payload: any = {
        amount: amount,
        currency: currency,
        returnUrl: returnUrl,
        resources: {
          typeId: typeId,
          basketId: basketId,
        }
      }

      // Add payment reference into payload if its passed
      if (paymentReference) {
        payload.paymentReference = paymentReference
      }

      // Add order Id into payload if its passed
      if (orderId) {
        payload.orderId = orderId
      }

      // Add card3ds into payload it its passed
      if(card3ds) {
        payload.card3ds = card3ds
      }

      // Add customer Id into payload if its passed
      if (customerId) {
        payload.resources.customerId = customerId
      }

      // Add metadta Id into payload if its passed
      if (metadataId) {
        payload.resources.metadataId = metadataId
      }

      if (orderId) {
        payload.orderId = orderId
      }

      if (invoiceId) {
        payload.invoiceId = invoiceId
      }

      // Call api end point to get response
      const response: any = await paymentService
        .getRequestAdapter()
        .post(apiURL.URL_PAYMENT_CHARGE, payload, paymentService.getUnzer().getPrivateKey())

      // Handle errors response        
      if (response.errors) {
        return reject(ResponseErrorsMapper(response))
      }

      // New Charge with Hedeipay instance
      let charge = new Charge(paymentService.getUnzer())

      // Set chargeId
      charge.setId(response.id)

      // Set amount
      charge.setAmount(response.amount)

      // Set order Id
      if (response.orderId) {
        charge.setOrderId(response.orderId)
      }

      // Set invoice Id
      if (response.invoiceId) {
        charge.setInvoiceId(response.invoiceId)
      }

      // Set currency
      charge.setCurrency(response.currency)

      // Set return URL
      charge.setReturnUrl(response.returnUrl)

      // Set 3ds option
      charge.setCard3ds(response.card3ds)

      // Set resources
      charge.setResources(response.resources)

      // Set Processing
      charge.setProcessing(response.processing)

      // Set payment object
      charge.setPayment(await FetchPayment(response.resources.paymentId, paymentService))

      // Set Payload
      charge.setPayload(response)

      // Resolve final result
      resolve(charge)
    } catch (error) {
      // Reject with error object
      reject(error)
    }
  })
}
