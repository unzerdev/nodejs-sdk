import Unzer from '../../../src/Unzer'
import * as TestHelper from '../../helpers/TestHelper'
import EPS from '../../../src/payments/types/Eps'

describe('Payment Type Eps Test', () => {
  let unzer: Unzer

  const getEps = () => {
    return new EPS()
  }

  const getEpsWithBic = () => {
    const eps = new EPS()
    eps.setBic("TESTDETT421")

    return eps
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createUnzerInstance()
  })

  it('Test Create Eps payment type', async () => {
    const eps: EPS = await unzer.createPaymentType(getEps()) as EPS

    expect(eps.getId()).toBeDefined()
    expect(eps.getPayload()).toBeDefined()
  })

  it('Test Create Eps payment type with bic', async () => {
    const eps: EPS = await unzer.createPaymentType(getEpsWithBic()) as EPS

    expect(eps.getId()).toBeDefined()
    expect(eps.getPayload()).toBeDefined()
  })

  it('Test Fetch Eps payment type', async () => {
    const eps: EPS = await unzer.createPaymentType(getEps()) as EPS
    const fetchEps: EPS = await unzer.fetchPaymentType(eps.getId()) as EPS

    expect(fetchEps.getId()).toEqual(eps.getId())
  })

  it('Test geoLocation', async () => {
    const eps: EPS = await unzer.createPaymentType(getEps()) as EPS
    const fetchEps: EPS = await unzer.fetchPaymentType(eps.getId()) as EPS

    expect(eps.getGeoLocation()).toBeDefined()
    expect(fetchEps.getGeoLocation()).toBeDefined()
  })
})
