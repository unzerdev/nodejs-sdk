import Unzer from '../../src/Unzer'
import * as ErrorMessage from '../../src/configs/ErrorMessage'
import * as TestHelper from '../helpers/TestHelper'
import Card from '../../src/payments/types/Card';

describe('Payment Type Card Test', () => {
  let unzer: Unzer
  const { getAuthorization, getCancelAuthorization, getCancelCharge, getCharge } = TestHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = new Unzer('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
  })

  it('Test missing key heidelpay', async () => {
    try {
      const errorUnzer = new Unzer(null)
    } catch (error) {
      expect(error.message).toBeDefined()
    }
  })

  it('Test authorize invalid key heidelpay', async () => {
    try {
      const errorUnzer = new Unzer('6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf', 'de')
      await errorUnzer.authorize(getAuthorization(""))
    } catch (error) {
      const errorData = JSON.parse(error.message)
      expect(errorData[0].code).toBeDefined()
    }
  })

  it('Test charge with empty value', async () => {
    try {
      await unzer.charge(getCharge(""))
    } catch (error) {
      const errorData = JSON.parse(error.message)
      expect(errorData[0].code).toBeDefined()
    }
  })

  it('Test charge authorize with empty value', async () => {
    try {
      await unzer.chargeAuthorization(TestHelper.getChargeAuthorization(""))
    } catch (error) {
      const errorData = JSON.parse(error.message)
      expect(errorData[0].code).toBeDefined()
    }
  })

  it('Test cancel authorize with empty value', async () => {
    try {
      await unzer.cancelAuthorization(getCancelAuthorization("", "", 50))
    } catch (error) {
      const errorData = JSON.parse(error.message)
      expect(errorData[0].code).toBeDefined()
    }
  })

  it('Test cancel charge with empty value', async () => {
    try {
      await unzer.cancelCharge(getCancelCharge("", ""))
    } catch (error) {
      const errorData = JSON.parse(error.message)
      expect(errorData[0].code).toBeDefined()
    }
  })

  it('Test create payment type with empty value', async () => {
    try {
      const card: Card = new Card()
      await unzer.createPaymentType(card)
    } catch (error) {
      const errorData = JSON.parse(error.message)
      expect(errorData[0].code).toBeDefined()
    }
  })

  it('Test fetch payment with empty value', async () => {
    try {
      await unzer.fetchPayment("")
    } catch (error) {
      const errorData = JSON.parse(error.message)
      expect(errorData[0].code).toBeDefined()
    }
  })


  it('Test fetch cancel with empty value', async () => {
    try {
      await unzer.fetchCancel("", "", "")
    } catch (error) {
      const errorData = JSON.parse(error.message)
      expect(errorData[0].code).toBeDefined()
    }
  })
})
