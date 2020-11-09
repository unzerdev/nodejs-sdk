import Unzer from '../../../src/Unzer'
import * as TestHelper from '../../helpers/TestHelper'
import Prepayment from '../../../src/payments/types/Prepayment'

describe('Payment Type Prepayment Test', () => {
  let unzer: Unzer

  const getPrepayment = () => {
    return new Prepayment()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createHeidelpayInstance()
  })

  it('Test Create Prepayment payment type', async () => {
    const prepayment: Prepayment = await unzer.createPaymentType(getPrepayment()) as Prepayment

    expect(prepayment.getId()).toBeDefined()
  })

  it('Test Fetch Prepayment payment type', async () => {
    const prepayment: Prepayment = await unzer.createPaymentType(getPrepayment()) as Prepayment
    const fetchPrepayment: Prepayment = await unzer.fetchPaymentType(prepayment.getId()) as Prepayment

    expect(fetchPrepayment.getId()).toEqual(prepayment.getId())
  })

  it('Test geoLocation', async () => {
    const prepayment: Prepayment = await unzer.createPaymentType(getPrepayment()) as Prepayment
    const fetchPrepayment: Prepayment = await unzer.fetchPaymentType(prepayment.getId()) as Prepayment

    expect(prepayment.getGeoLocation()).toBeDefined()
    expect(fetchPrepayment.getGeoLocation()).toBeDefined()
  })
})
