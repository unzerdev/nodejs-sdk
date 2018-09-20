import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import Sofort from '../../../src/payments/types/Sofort'

describe('Payment Type Sofort Test', () => {
  let heidelpay: Heidelpay

  const getSofort = () => {
    return new Sofort()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = new Heidelpay('s-priv-6S59Dt6Q9mJYj8X5qpcxSpA3XLXUw4Zf')
  })

  it('Test Create Sofort payment type', async () => {
    const sofort: Sofort = await heidelpay.createPaymentType(getSofort()) as Sofort

    expect(sofort.getId()).toBeDefined()
  })

  it('Test Fetch Sofort payment type', async () => {
    const sofort: Sofort = await heidelpay.createPaymentType(getSofort()) as Sofort
    const fetchSofort: Sofort = await heidelpay.fetchPaymentType(sofort.getId()) as Sofort

    expect(fetchSofort.getId()).toEqual(sofort.getId())
  })
})
