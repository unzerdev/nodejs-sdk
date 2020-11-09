import * as apiURL from '../configs/ApiUrls'
import PaymentService from './PaymentService'
import FetchPayment from './FetchPayment'
import Authorization, { authorizeObject } from '../payments/business/Authorization'
import ResponseErrorsMapper from './mappers/ResponseErrorsMapper';

export default (args: authorizeObject, paymentService: PaymentService): Promise<Authorization> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { 
        amount, orderId, currency, typeId, customerId, returnUrl,
        paymentReference, metadataId, basketId, effectiveInterestRate
      } = args
      let payload: any = {
        amount: amount,
        currency: currency,
        returnUrl: returnUrl,
        resources: {
          typeId: typeId
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

      if (effectiveInterestRate) {
        payload.effectiveInterestRate = effectiveInterestRate
      }

      // Add customer Id into payload if its passed
      if (customerId) {
        payload.resources.customerId = customerId
      }

      // Add metadta Id into payload if its passed
      if (metadataId) {
        payload.resources.metadataId = metadataId
      }

      if (basketId) {
        payload.resources.basketId = basketId
      }

      // Call api end point to get response
      const response: any = await paymentService
        .getRequestAdapter()
        .post(
          apiURL.URL_PAYMENT_AUTHORIZE,
          payload,
          paymentService.getUnzer().getPrivateKey()
        )

      if (response.errors) {
        return reject(ResponseErrorsMapper(response))
      }

      // New Authorize with Hedeipay instance
      let authorization = new Authorization(paymentService.getUnzer())

      // Set authorization Id
      authorization.setId(response.id)

      // Set amount
      authorization.setAmount(response.amount)

      // Set order Id
      if (response.orderId) {
        authorization.setOrderId(response.orderId)
      }

      // Set currency
      authorization.setCurrency(response.currency)

      // Set return URL
      authorization.setReturnUrl(response.returnUrl)

      // Set payment reference
      if (response.paymentReference) {
        authorization.setPaymentReference(response.paymentReference)
      }

      // Set zg payment reference Id
      if (response.zgReferenceId) {
        authorization.setZgReferenceId(response.zgReferenceId)
      }

      // Set resources
      authorization.setResources(response.resources)

      // Set Processing
      authorization.setProcessing(response.processing)

      // Set payment object
      authorization.setPayment(await FetchPayment(response.resources.paymentId, paymentService))

      // Set Payload
      authorization.setPayload(response)

      // Resolve final result
      resolve(authorization)
    } catch (error) {
      // Reject with error object
      return reject(error)
    }
  })
}
