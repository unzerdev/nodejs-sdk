import Unzer from '../../src/Unzer'
import * as ErrorMessage from '../../src/configs/ErrorMessage'
import * as TestHelper from '../helpers/TestHelper'
import Card from '../../src/payments/types/Card'
import Authorization from '../../src/payments/business/Authorization'
import Cancel from '../../src/payments/business/Cancel'
import Prepayment from '../../src/payments/types/Prepayment'

describe('Payment Type Card Test', () => {
  let unzer: Unzer
  let createPaymentTypeCard
  const { getAuthorization, getCancelAuthorization, getCancelCharge, getCharge } = TestHelper

  const getPrepayment = () => {
    return new Prepayment()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createUnzerInstance()
    createPaymentTypeCard = TestHelper.createPaymentTypeCard(unzer)
  })

  it('Test Authorize with Prepayment payment type', async () => {
    try {
      const prepayment: Prepayment = await unzer.createPaymentType(getPrepayment()) as Prepayment
      await prepayment.authorize(TestHelper.getAuthorization(prepayment.getId()))  
    } catch (error) {
      expect(error.message).toBeDefined()

      const errorMessage = JSON.parse(error.message)
      expect(errorMessage[0].code).toEqual("API.320.000.004")
      expect(errorMessage[0].merchantMessage).toBeDefined()
    }
  })

  it('Test cancel authorization error', async () => {
    try {
      const card: Card = await createPaymentTypeCard()
      const authorization: Authorization = await unzer.authorize(getAuthorization(card.getId()))

      await authorization.cancel(500)
    } catch (error) {
      expect(error.message).toBeDefined()

      const errorMessage = JSON.parse(error.message)
      expect(errorMessage[0].code).toEqual("API.340.100.017")
      expect(errorMessage[0].merchantMessage).toBeDefined()
    }
  })
})
