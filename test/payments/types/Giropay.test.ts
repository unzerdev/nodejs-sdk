import Unzer from '../../../src/Unzer'
import * as TestHelper from '../../helpers/TestHelper'
import Giropay from '../../../src/payments/types/Giropay'

describe('Payment Type Giropay Test', () => {
  let unzer: Unzer

  const getGiropay = () => {
    return new Giropay()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createHeidelpayInstance()
  })

  it('Test Create Giropay payment type', async () => {
    const giropay: Giropay = await unzer.createPaymentType(getGiropay()) as Giropay

    expect(giropay.getId()).toBeDefined()
  })

  it('Test Fetch Giropay payment type', async () => {
    const giropay: Giropay = await unzer.createPaymentType(getGiropay()) as Giropay
    const fetchGiropay: Giropay = await unzer.fetchPaymentType(giropay.getId()) as Giropay

    expect(fetchGiropay.getId()).toEqual(giropay.getId())
  })

  it('Test geoLocation', async () => {
    const giropay: Giropay = await unzer.createPaymentType(getGiropay()) as Giropay
    const fetchGiropay: Giropay = await unzer.fetchPaymentType(giropay.getId()) as Giropay

    expect(giropay.getGeoLocation()).toBeDefined()
    expect(fetchGiropay.getGeoLocation()).toBeDefined()
  })
})
