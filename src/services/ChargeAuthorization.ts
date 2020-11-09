import * as apiURL from '../configs/ApiUrls'
import * as Utils from '../utils/Utils'
import PaymentService from './PaymentService'
import Charge from '../payments/business/Charge'
import { chargeAuthorizeObject } from '../payments/business/Authorization'
import FetchPayment from './FetchPayment'
import ResponseErrorsMapper from './mappers/ResponseErrorsMapper'

export default (args: chargeAuthorizeObject, paymentService: PaymentService): Promise<Charge> => {
  return new Promise(async (resolve, reject) => {
    try {
      let payload: any = {}
      const {paymentId, amount, paymentReference} = args

      if (amount) {
        payload.amount = amount
      }

      // Add payment reference into payload if its passed
      if(paymentReference) {
        payload.paymentReference = paymentReference
      }

      // Call api end point to get response
      const response: any = await paymentService
      .getRequestAdapter()
      .post(
        Utils.replaceUrl(apiURL.URL_PAYMENT_CHARGE_AUTHORIZE, {
          paymentId,
        }),
        payload,
        paymentService.getUnzer().getPrivateKey()
      )

      // Handle errors response
      if (response.errors) {
        return reject(ResponseErrorsMapper(response))
      }

      // New Charge with Hedeipay instance
      let charge = new Charge(paymentService.getUnzer())

      // Set charge Id
      charge.setId(response.id)

      // Set amount
      charge.setAmount(response.amount)

      // Set order Id
      if(response.orderId) {
        charge.setOrderId(response.orderId)
      }

      // Set payment reference
      if(response.paymentReference) {
        charge.setPaymentReference(response.paymentReference)
      }

      // Set resources
      charge.setResources(response.resources)

      // Set Processing
      charge.setProcessing(response.processing)

      // Set payment object
      charge.setPayment(await FetchPayment(response.resources.paymentId, paymentService))

      // Set payload
      charge.setPayload(response)

      // Resolve final result
      resolve(charge)
    } catch (error) {
      // Reject with error object
      reject(error)
    }
  })
}
