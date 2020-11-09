import PaymentService from './PaymentService'
import Cancel from '../payments/business/Cancel'
import ResponseErrorsMapper from './mappers/ResponseErrorsMapper'

export default (args: string, paymentService: PaymentService): Promise<Cancel> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Call api end point to get response
      const response: any = await paymentService
        .getRequestAdapter()
        .get(args, paymentService.getUnzer().getPrivateKey(), true)

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
      if(response.orderId) {
        cancel.setOrderId(response.orderId)
      }

      // Set payment reference
      if(response.paymentReference) {
        cancel.setPaymentReference(response.paymentReference)
      }

      // Set resources
      cancel.setResources(response.resources)

      // Set Processing
      cancel.setProcessing(response.processing)

      // Set Payload
      cancel.setPayload(response)

      // Resolve final result
      resolve(cancel)
    } catch (error) {
      // Reject with error object
      reject(error)
    }
  })
}
