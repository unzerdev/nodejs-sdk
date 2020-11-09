import Unzer from '../../../src/Unzer'
import * as TestHelper from '../../helpers/TestHelper'
import Przelewy24 from '../../../src/payments/types/Przelewy24'

describe('Payment Type Przelewy24 Test', () => {
  let unzer: Unzer

  const getPrzelewy24 = () => {
    return new Przelewy24()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createUnzerInstance()
  })

  it('Test Create Przelewy24 payment type', async () => {
    const przelewy24: Przelewy24 = await unzer.createPaymentType(getPrzelewy24()) as Przelewy24

    expect(przelewy24.getId()).toBeDefined()
  })

  it('Test Fetch Przelewy24 payment type', async () => {
    const przelewy24: Przelewy24 = await unzer.createPaymentType(getPrzelewy24()) as Przelewy24
    const fetchPrzelewy24: Przelewy24 = await unzer.fetchPaymentType(przelewy24.getId()) as Przelewy24

    expect(fetchPrzelewy24.getId()).toEqual(przelewy24.getId())
  })

  it('Test geoLocation', async () => {
    const przelewy24: Przelewy24 = await unzer.createPaymentType(getPrzelewy24()) as Przelewy24
    const fetchPrzelewy24: Przelewy24 = await unzer.fetchPaymentType(przelewy24.getId()) as Przelewy24

    expect(przelewy24.getGeoLocation()).toBeDefined()
    expect(fetchPrzelewy24.getGeoLocation()).toBeDefined()
  })
})
