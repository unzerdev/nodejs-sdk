import * as apiURL from '../configs/ApiUrls'
import PaymentService from './PaymentService'
import Paypage from '../payments/paypage/Paypage'
import ResponseErrorsMapper from './mappers/ResponseErrorsMapper'

export default (paypage: Paypage, type: string, paymentService: PaymentService): Promise<Paypage> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Get payload
      const payload = paypage.getPayload()

      // Get additional attributes
      const additionalAttributes: any = paypage.getAdditionalAttributes()
      if (additionalAttributes && additionalAttributes.effectiveInterestRate) {
        payload['additionalAttributes.effectiveInterestRate'] = additionalAttributes.effectiveInterestRate
      }

      // Call api end point to get response
      const response: any = await paymentService
        .getRequestAdapter()
        .post(
          type === 'authorize' ? apiURL.URL_PAYPAGE_AUTHORIZE : apiURL.URL_PAYPAGE_CHARGE,
          payload,
          paymentService.getUnzer().getPrivateKey()
        )

      // Handle errors response    
      if (response.errors) {
        return reject(ResponseErrorsMapper(response))
      }

      // Set Unzer instance
      paypage.setUnzer(paymentService.getUnzer())

      // Set Payment Id
      paypage.setId(response.id)

      // Set Redirect URL
      paypage.setRedirectUrl(response.redirectUrl)
      
      // Set action (AUTHORIZE|CHARGE)
      paypage.setAction(response.action)

      // Set resources
      paypage.setResources(response.resources)

      // Resolve final result
      resolve(paypage)
    } catch (error) {
      // Reject with error object
      return reject(error) 
    }
  })
}
