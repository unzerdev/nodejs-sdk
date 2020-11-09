import * as apiURL from '../configs/ApiUrls'
import PaymentService from './PaymentService'
import ResponseErrorsMapper from './mappers/ResponseErrorsMapper';
import Shipment, { shipmentObject } from '../payments/business/Shipment';
import * as Utils from '../utils/Utils'

export default (paymentId: string, args: shipmentObject, paymentService: PaymentService): Promise<Shipment> => {
  return new Promise(async (resolve, reject) => {
    try {
      const { orderId, invoiceId } = args
      const payload: any = {}

      if (orderId) {
        payload.orderId = orderId
      }

      if (invoiceId) {
        payload.invoiceId = invoiceId
      }

      // Call api end point to get response
      const response: any = await paymentService.getRequestAdapter().post(
        Utils.replaceUrl(apiURL.URL_PAYMENT_SHIPMENT, {
          paymentId: paymentId,
        }),
        payload,
        paymentService.getUnzer().getPrivateKey()
      )

      if (response.errors) {
        return reject(ResponseErrorsMapper(response))
      }

      // New Shipment with Hedeipay instance
      let shipment = new Shipment(paymentService.getUnzer())

      // Set shipment Id
      shipment.setId(response.id)

      // Set amount of charge
      shipment.setAmount(response.amount)

      // Set order Id
      if (response.orderId) {
        shipment.setOrderId(response.orderId)
      }

      // Set invoice Id
      if (response.invoiceId) {
        shipment.setInvoiceId(response.invoiceId)
      }

      // Set resources
      shipment.setResources(response.resources)

      // Set Processing
      shipment.setProcessing(response.processing)

      // Set Payload
      shipment.setPayload(response)

      // Resolve final result
      resolve(shipment)
    } catch (error) {
      // Reject with error object
      return reject(error)
    }
  })
}
