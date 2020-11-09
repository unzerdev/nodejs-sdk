import * as apiURL from '../configs/ApiUrls'
import PaymentService from './PaymentService'
import Metadata from '../payments/Metadata'

export default (metadata: Metadata, paymentService: PaymentService): Promise<Metadata> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Call api end point to get response
      const response: any = await paymentService
        .getRequestAdapter()
        .post(
          apiURL.URL_METADATA,
          metadata.getRequestPayload(),
          paymentService.getUnzer().getPrivateKey()
        )

      // Mapper metadata value
      const newMetadata = new Metadata()
      newMetadata.setId(response.id)

      // Resolve final result
      resolve(newMetadata)  
    } catch (error) {
      // Reject with error object
      reject(error)
    }
  })
}
