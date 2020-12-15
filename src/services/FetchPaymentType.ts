import * as Utils from '../utils/Utils'
import PaymentType from '../payments/types/PaymentType'
import PaymentService from './PaymentService'
import AbstractPaymentType from '../payments/types/AbstractPaymentType'

export default (typeId: string, paymentService: PaymentService): Promise<PaymentType> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Parse paymentTypeId string to typeId and create a PaymentType
      const paymentType: AbstractPaymentType = Utils.getPaymentTypeFromTypeId(typeId)

      // Set Unzer instance
      paymentType.setUnzer(paymentService.getUnzer())

      // Parse URL with parameters
      const requestUrl = `/types/${typeId}`

      // Call api end point to get response
      const response: any = await paymentService
        .getRequestAdapter()
        .get(requestUrl, paymentService.getUnzer().getPrivateKey())

      // Resolve final result
      resolve(Utils.mapResponsePaymentType(response))  
    } catch (error) {
      // Reject with error object
      reject(error)  
    }
  })
}
