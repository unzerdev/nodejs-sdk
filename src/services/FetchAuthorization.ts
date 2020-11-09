import PaymentService from './PaymentService'
import Authorization from '../payments/business/Authorization'

export default (args: string, paymentService: PaymentService): Promise<Authorization> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Call api end point to get response
      const response: any = await paymentService
        .getRequestAdapter()
        .get(args, paymentService.getUnzer().getPrivateKey(), true)

      // New authorization with Hedeipay instance
      let authorization = new Authorization(paymentService.getUnzer())

      // Set authorization Id
      authorization.setId(response.id)

      // Set order Id
      if(response.orderId) {
        authorization.setOrderId(response.orderId)
      }

      // Set amount of authorization
      authorization.setAmount(response.amount)

      // Set currency
      authorization.setCurrency(response.currency)

      // Set return URL
      authorization.setReturnUrl(response.returnUrl)

      // Set payment Reference
      authorization.setPaymentReference(response.paymentReference)

      // Set zg payment reference Id
      authorization.setZgReferenceId(response.zgReferenceId)

      // Set resources
      authorization.setResources(response.resources)

      // Set Processing
      authorization.setProcessing(response.processing)

      // Set payload
      authorization.setPayload(response)

      // Resolve final result
      resolve(authorization)
    } catch (error) {
      // Reject with error object
      reject(error)
    }
  })
}
