import PaymentService from './PaymentService'
import Authorization from '../payments/business/Authorization'

export default (args: string, paymentService: PaymentService): Promise<Authorization> => {
  return new Promise(async resolve => {
    // Call api end point to get response
    const response: any = await paymentService
      .getRequestAdapter()
      .get(args, paymentService.getHeidelpay().getPrivateKey(), true)

    // New authorization with Hedeipay instance
    let authorization = new Authorization(paymentService.getHeidelpay())

    // Set authorization Id
    authorization.setId(response.id)

    // Set amount of authorization
    authorization.setAmount(response.amount)

    // Set resources
    authorization.setResources(response.resources)

    // Resolve final result
    resolve(authorization)
  })
}
