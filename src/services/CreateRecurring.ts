import * as apiURL from '../configs/ApiUrls'
import * as Utils from '../utils/Utils'
import PaymentService from './PaymentService'
import Recurring, { recurringObject } from '../payments/business/Recurring'
import ResponseErrorsMapper from './mappers/ResponseErrorsMapper'

export default (typeId: string, args: recurringObject, paymentService: PaymentService): Promise<Recurring> => {
  return new Promise(async (resolve, reject) => {
    const { returnUrl, customerId, metadataId } = args

    const payload: any = {
      returnUrl: returnUrl,
      resources: {}
    }

    if (customerId) {
      payload.resources.customerId = customerId
    }

    if (metadataId) {
      payload.resources.metadataId = metadataId
    }

    try {
      // Call api end point to get response
      const response: any = await paymentService
        .getRequestAdapter()
        .post(
          Utils.replaceUrl(apiURL.URL_RECURRING, {
            typeId,
          }),
          payload,
          paymentService.getUnzer().getPrivateKey()
        )

      if (response.errors) {
        return reject(ResponseErrorsMapper(response))
      }

      const newRecurring = new Recurring()

      newRecurring.setReturnUrl(response.returnUrl) 
      newRecurring.setRedirectUrl(response.redirectUrl)
      newRecurring.setProcessing(response.processing)
      newRecurring.setResources(response.resources)

      // Resolve final result
      resolve(newRecurring)
    } catch (error) {
      // Reject with error object
      reject(error)
    }
  })
}
