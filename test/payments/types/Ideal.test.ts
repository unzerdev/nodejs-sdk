import Unzer from '../../../src/Unzer'
import * as TestHelper from '../../helpers/TestHelper'
import Ideal from '../../../src/payments/types/Ideal'

describe('Payment Type Ideal Test', () => {
  let unzer: Unzer

  const getIdeal = () => {
    return new Ideal().setBic("RABONL2U")
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createUnzerInstance()
  })

  it('Test Create Ideal payment type', async () => {
    const ideal: Ideal = await unzer.createPaymentType(getIdeal()) as Ideal

    expect(ideal.getId()).toBeDefined()
  })

  it('Test Fetch Ideal payment type', async () => {
    const ideal: Ideal = await unzer.createPaymentType(getIdeal()) as Ideal
    const fetchIdeal: Ideal = await unzer.fetchPaymentType(ideal.getId()) as Ideal

    expect(fetchIdeal.getId()).toEqual(ideal.getId())
  })

  it('Test geoLocation', async () => {
    const ideal: Ideal = await unzer.createPaymentType(getIdeal()) as Ideal
    const fetchIdeal: Ideal = await unzer.fetchPaymentType(ideal.getId()) as Ideal

    expect(ideal.getGeoLocation()).toBeDefined()
    expect(fetchIdeal.getGeoLocation()).toBeDefined()
  })
})
