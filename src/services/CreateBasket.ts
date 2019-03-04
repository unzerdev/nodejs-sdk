import * as apiURL from '../configs/ApiUrls'
import PaymentService from './PaymentService'
import Basket from '../payments/Basket'

export default (basket: Basket, paymentService: PaymentService): Promise<Basket> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Call api end point to get response
      const response: any = await paymentService
        .getRequestAdapter()
        .post(
          apiURL.URL_BASKET,
          basket.getRequestPayload(),
          paymentService.getHeidelpay().getPrivateKey()
        )

      const newBasket = new Basket()
      newBasket.setId(response.id)

      // Resolve final result
      resolve(newBasket)  
    } catch (error) {
      // Reject with error object
      reject(error)
    }
  })
}
