import * as apiURL from '../configs/ApiUrls'
import PaymentService from './PaymentService'
import Basket, {basketItemObject} from '../payments/Basket'

export default (basketId: string, paymentService: PaymentService): Promise<Basket> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Call api end point to get response
      const response: any = await paymentService
        .getRequestAdapter()
        .get(
          `${apiURL.URL_BASKET}/${basketId}`, 
          paymentService.getUnzer().getPrivateKey()
        )

      const newBasket = new Basket()
      newBasket.setId(response.id)
      
      // Set amount total
      newBasket.setAmountTotalGross(response.amountTotalGross)

      // Set Amount total discount
      newBasket.setAmountTotalDiscount(response.amountTotalDiscount)

      // Set currency code
      newBasket.setCurrencyCode(response.currencyCode)

      // Set Order Id
      newBasket.setOrderId(response.orderId)

      // Set note
      newBasket.setNote(response.note)

      // Set baskset Items
      response.basketItems.map((item:basketItemObject) => newBasket.addItem(item))

      // Set payload
      newBasket.setPayload(response)

      // Resolve final result
      resolve(newBasket)  
    } catch (error) {
      // Reject with error object
      reject(error)
    }
  })
}
