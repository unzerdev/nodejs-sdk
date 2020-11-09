import Unzer from '../../../src/Unzer'
import * as TestHelper from '../../helpers/TestHelper'
import Pis from '../../../src/payments/types/Pis'

describe('Payment Type PIS Test', () => {
  let unzer: Unzer

  const getPis = () => {
    return new Pis()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createUnzerInstance()
  })

  it('Test Create PIS payment type', async () => {
    const pis: Pis = await unzer.createPaymentType(getPis()) as Pis

    expect(pis.getId()).toBeDefined()
  })

  it('Test Fetch PIS payment type', async () => {
    const pis: Pis = await unzer.createPaymentType(getPis()) as Pis
    const fetchPis: Pis = await unzer.fetchPaymentType(pis.getId()) as Pis

    expect(fetchPis.getId()).toEqual(pis.getId())
  })

  it('Test geoLocation', async () => {
    const pis: Pis = await unzer.createPaymentType(getPis()) as Pis
    const fetchPis: Pis = await unzer.fetchPaymentType(pis.getId()) as Pis

    expect(pis.getGeoLocation()).toBeDefined()
    expect(fetchPis.getGeoLocation()).toBeDefined()
  })
})
