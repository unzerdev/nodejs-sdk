import Unzer from '../../../src/Unzer'
import * as TestHelper from '../../helpers/TestHelper'
import * as CustomerTestHelper from '../../helpers/CustomerTestHelper'
import SepaDirectDebitGuaranteed from '../../../src/payments/types/SepaDirectDebitGuaranteed'

describe('Payment Type SepaDirectDebitGuaranteed Test', () => {
  let unzer: Unzer
  const { createFullCustomer } = CustomerTestHelper
  const { getCharge } = TestHelper

  const getSSDConstructor = () => {
    return new SepaDirectDebitGuaranteed("DE89370400440532013000")
      .setBic("COBADEFFXXX")
      .setHolder("Rene Felder")
  }

  const getSSD = () => {
    return new SepaDirectDebitGuaranteed()
      .setIban("DE89370400440532013000")
      .setBic("COBADEFFXXX")
      .setHolder("Rene Felder")
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createHeidelpayInstance()
  })

  it('Test Create SepaDirectDebitGuaranteed payment type', async () => {
    const ssd: SepaDirectDebitGuaranteed = await unzer.createPaymentType(getSSDConstructor()) as SepaDirectDebitGuaranteed

    expect(ssd.getId()).toBeDefined()
  })

  it('Test Fetch SepaDirectDebitGuaranteed payment type', async () => {
    const ssd: SepaDirectDebitGuaranteed = await unzer.createPaymentType(getSSD()) as SepaDirectDebitGuaranteed
    const fetchSepaDirectDebitGuaranteed: SepaDirectDebitGuaranteed = await unzer.fetchPaymentType(ssd.getId()) as SepaDirectDebitGuaranteed

    expect(fetchSepaDirectDebitGuaranteed.getId()).toEqual(ssd.getId())
  })

  it('Test geoLocation', async () => {
    const ssd: SepaDirectDebitGuaranteed = await unzer.createPaymentType(getSSD()) as SepaDirectDebitGuaranteed
    const fetchSepaDirectDebitGuaranteed: SepaDirectDebitGuaranteed = await unzer.fetchPaymentType(ssd.getId()) as SepaDirectDebitGuaranteed

    expect(ssd.getGeoLocation()).toBeDefined()
    expect(fetchSepaDirectDebitGuaranteed.getGeoLocation()).toBeDefined()
  })
})
