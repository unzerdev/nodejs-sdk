import * as apiURL from '../configs/ApiUrls'
import PaymentService from './PaymentService'
import { Customer } from '../payments/Customer'
import ResponseCustomerMapper from './mappers/ResponseCustomerMapper'

export default (customerId: string, paymentService: PaymentService): Promise<Customer> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Call api end point to get response
      const response: any = await paymentService
        .getRequestAdapter()
        .get(
          `${apiURL.URL_CUSTOMER}/${customerId}`, 
          paymentService.getUnzer().
          getPrivateKey()
        )

      // Mapper customer
      const newCustomer = ResponseCustomerMapper(response)

      // Resolve final result
      resolve(newCustomer)  
    } catch (error) {
      // Reject with error object
      reject(error)  
    }
  })
}
