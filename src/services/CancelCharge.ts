import * as apiURL from '../configs/ApiUrls'
import * as Utils from '../utils/Utils'
import PaymentService from './PaymentService'
import Cancel, { cancelChargeObject } from '../payments/business/Cancel'
import FetchPayment from './FetchPayment'
import ResponseErrorsMapper from './mappers/ResponseErrorsMapper';

export default (args: cancelChargeObject, paymentService: PaymentService): Promise<Cancel> => {
  return new Promise(async (resolve, reject) => {
    try {
      let payload: any = {}
      const {
        paymentId, chargeId, amount, paymentReference,
        amountGross, amountNet, amountVat,
      } = args

      // Add amount into payload if its passed
      if (amount) {
        payload.amount = amount
      }

      if (amountGross) {
        payload.amountGross = amountGross
      }

      if (amountNet) {
        payload.amountNet = amountNet
      }

      if (amountVat) {
        payload.amountVat = amountVat
      }

      // Add payment reference into payload if its passed
      if (paymentReference) {
        payload.paymentReference = paymentReference
      }

      // Call api end point to get response
      const response: any = await paymentService.getRequestAdapter().post(
        Utils.replaceUrl(apiURL.URL_PAYMENT_CHARGE_CANCEL, {
          paymentId,
          chargeId,
        }),
        payload,
        paymentService.getUnzer().getPrivateKey()
      )

      // Handle errors response        
      if (response.errors) {
        return reject(ResponseErrorsMapper(response))
      }

      // New Cancel with Hedeipay instance
      let cancel = new Cancel(paymentService.getUnzer())

      // Set cancel Id
      cancel.setId(response.id)

      // Set amount of cancel
      cancel.setAmount(response.amount)

      // Set order Id
      if (response.orderId) {
        cancel.setOrderId(response.orderId)
      }

      // Set payment reference
      if (response.paymentReference) {
        cancel.setPaymentReference(response.paymentReference)
      }

      // Set resources
      cancel.setResources(response.resources)

      // Set Processing
      cancel.setProcessing(response.processing)

      // Set payment object
      cancel.setPayment(await FetchPayment(response.resources.paymentId, paymentService))

      // Set payload
      cancel.setPayload(response)

      // Resolve final result
      resolve(cancel)
    } catch (error) {
      // Reject with error object
      reject(error)
    }
  })
}
