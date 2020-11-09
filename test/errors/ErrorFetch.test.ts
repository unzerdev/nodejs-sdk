import Unzer from '../../src/Unzer'
import * as TestHelper from '../helpers/TestHelper'

describe('Payment Type Card Test', () => {
  let unzer: Unzer
  const { getAuthorization, getCancelAuthorization, getCancelCharge, getCharge } = TestHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createHeidelpayInstance()
  })

  it('Test fetch authorization error', async () => {
    try {
      await unzer.fetchAuthorization('s-pay-578901239')
    } catch (error) {
      expect(error.message).toBeDefined()

      const errorMessage = JSON.parse(error.message)
      expect(errorMessage[0].code).toEqual("API.310.100.003")
      expect(errorMessage[0].merchantMessage).toBeDefined()
    }
  })

  it('Test fetch charge error with wrong payment Id', async () => {
    try {
      await unzer.fetchCharge('s-pay-578901239', 's-chg-1314142')
    } catch (error) {
      expect(error.message).toBeDefined()

      const errorMessage = JSON.parse(error.message)
      expect(errorMessage[0].code).toEqual("API.310.100.003")
      expect(errorMessage[0].merchantMessage).toBeDefined()
    }
  })

  it('Test fetch charge error with payment Id', async () => {
    try {
      await unzer.fetchCharge('s-pay-57', 's-chg-1314142')
    } catch (error) {
      expect(error.message).toEqual("Charge Id is not found in list of transaction")
    }
  })

  it('Test fetch cancel charge error with payment Id', async () => {
    try {
      const charge = await unzer.fetchCharge('s-pay-57', 's-chg-1')
      charge.getCancel('s-cn-1234')
    } catch (error) {
      expect(error.message).toEqual("Cancel Id is not found in list of transaction")
    }
  })

  it('Test fetch cancel error with wrong payment Id', async () => {
    try {
      await unzer.fetchCancel('s-pay-578901239', 's-cnl-1314142')
    } catch (error) {
      expect(error.message).toBeDefined()

      const errorMessage = JSON.parse(error.message)
      expect(errorMessage[0].code).toEqual("API.310.100.003")
      expect(errorMessage[0].merchantMessage).toEqual("Payment not found with key s-pay-578901239")
    }
  })

  it('Test fetch cancel error with wrong cancel Id', async () => {
    try {
      await unzer.fetchCancel('s-pay-57', 's-cnl-1')
    } catch (error) {
      expect(error.message).toBeDefined()
      expect(error.message).toEqual("Cancel Id is not found in list of transaction")
    }
  })

  it('Test fetch cancel error with wrong cancel Id and refund Id', async () => {
    try {
      await unzer.fetchCancel('s-pay-57', 's-cnl-1', 's-chg-1')
    } catch (error) {
      expect(error.message).toBeDefined()
      expect(error.message).toEqual("Cancel Id is not found in list of transaction")
    }
  })
})
