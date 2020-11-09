import Unzer from '../../../src/Unzer'
import * as TestHelper from '../../helpers/TestHelper'
import Invoice from '../../../src/payments/types/Invoice'

describe('Payment Type Invoice Test', () => {
  let unzer: Unzer

  const getInvoice = () => {
    return new Invoice()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createHeidelpayInstance()
  })

  it('Test Create Invoice payment type', async () => {
    const invoice: Invoice = await unzer.createPaymentType(getInvoice()) as Invoice

    expect(invoice.getId()).toBeDefined()
  })

  it('Test Fetch Invoice payment type', async () => {
    const invoice: Invoice = await unzer.createPaymentType(getInvoice()) as Invoice
    const fetchInvoice: Invoice = await unzer.fetchPaymentType(invoice.getId()) as Invoice

    expect(fetchInvoice.getId()).toEqual(invoice.getId())
  })

  it('Test geoLocation', async () => {
    const invoice: Invoice = await unzer.createPaymentType(getInvoice()) as Invoice
    const fetchInvoice: Invoice = await unzer.fetchPaymentType(invoice.getId()) as Invoice

    expect(invoice.getGeoLocation()).toBeDefined()
    expect(fetchInvoice.getGeoLocation()).toBeDefined()
  })
})
