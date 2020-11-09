import Unzer from '../../../src/Unzer'
import * as TestHelper from '../../helpers/TestHelper'
import Sofort from '../../../src/payments/types/Sofort'

describe('Payment Type Sofort Test', () => {
  let unzer: Unzer

  const getSofort = () => {
    return new Sofort()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createHeidelpayInstance()
  })

  it('Test Create Sofort payment type', async () => {
    const sofort: Sofort = await unzer.createPaymentType(getSofort()) as Sofort

    expect(sofort.getId()).toBeDefined()
  })

  it('Test Fetch Sofort payment type', async () => {
    const sofort: Sofort = await unzer.createPaymentType(getSofort()) as Sofort
    const fetchSofort: Sofort = await unzer.fetchPaymentType(sofort.getId()) as Sofort

    expect(fetchSofort.getId()).toEqual(sofort.getId())
  })

  it('Test geoLocation', async () => {
    const sofort: Sofort = await unzer.createPaymentType(getSofort()) as Sofort
    const fetchSofort: Sofort = await unzer.fetchPaymentType(sofort.getId()) as Sofort

    expect(sofort.getGeoLocation()).toBeDefined()
    expect(fetchSofort.getGeoLocation()).toBeDefined()
  })
})
