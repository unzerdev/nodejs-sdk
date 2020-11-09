import PaymentType from '../payments/types/PaymentType'
import PaymentService from './PaymentService'
import AbstractPaymentType from '../payments/types/AbstractPaymentType'
import ResponseErrorsMapper from './mappers/ResponseErrorsMapper'

export default (paymentType: AbstractPaymentType, paymentService: PaymentService): Promise<PaymentType> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Call api end point to get response
      const response: any = await paymentService
      .getRequestAdapter()
      .post(
        paymentType.getTypeUrl(),
        paymentType.getPayload(),
        paymentService.getHeidelpay().getPrivateKey()
      )

      // Handle errors response    
      if (response.errors) {
        return reject(ResponseErrorsMapper(response))
      }

      // Set Unzer instance
      paymentType.setHeidelpay(paymentService.getHeidelpay())

      // Set Payment Id
      paymentType.setId(response.id)

      if (response.geoLocation) {
        paymentType.setGeoLocation(response.geoLocation)
      }

      // Resolve final result
      resolve(paymentType)      
    } catch (error) {
      // Reject with error object
      return reject(error) 
    }
  })
}
