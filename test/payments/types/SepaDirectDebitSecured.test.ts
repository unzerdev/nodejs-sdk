import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import * as CustomerTestHelper from '../../helpers/CustomerTestHelper'
import SepaDirectDebitSecured from '../../../src/payments/types/SepaDirectDebitSecured'

describe('Payment Type SepaDirectDebitSecured Test', () => {
  let heidelpay: Heidelpay
  const { createFullCustomer } = CustomerTestHelper
  const { getCharge } = TestHelper

  const getSSDConstructor = () => {
    return new SepaDirectDebitSecured("DE89370400440532013000")
      .setBic("COBADEFFXXX")
      .setHolder("Rene Felder")
  }

  const getSSD = () => {
    return new SepaDirectDebitSecured()
      .setIban("DE89370400440532013000")
      .setBic("COBADEFFXXX")
      .setHolder("Rene Felder")
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
  })

  it('Test Create SepaDirectDebitSecured payment type', async () => {
    const ssd: SepaDirectDebitSecured = await heidelpay.createPaymentType(getSSDConstructor()) as SepaDirectDebitSecured

    expect(ssd.getId()).toBeDefined()
  })

  it('Test Fetch SepaDirectDebitSecured payment type', async () => {
    const ssd: SepaDirectDebitSecured = await heidelpay.createPaymentType(getSSD()) as SepaDirectDebitSecured
    const fetchSepaDirectDebitSecured: SepaDirectDebitSecured = await heidelpay.fetchPaymentType(ssd.getId()) as SepaDirectDebitSecured

    expect(fetchSepaDirectDebitSecured.getId()).toEqual(ssd.getId())
  })

  it('Test geoLocation', async () => {
    const ssd: SepaDirectDebitSecured = await heidelpay.createPaymentType(getSSD()) as SepaDirectDebitSecured
    const fetchSepaDirectDebitSecured: SepaDirectDebitSecured = await heidelpay.fetchPaymentType(ssd.getId()) as SepaDirectDebitSecured

    expect(ssd.getGeoLocation()).toBeDefined()
    expect(fetchSepaDirectDebitSecured.getGeoLocation()).toBeDefined()
  })
})
