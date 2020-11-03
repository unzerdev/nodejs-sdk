import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import Paypal from '../../../src/payments/types/Paypal'
import Recurring from '../../../src/payments/business/Recurring'

describe('Payment Type Paypal Test', () => {
  let heidelpay: Heidelpay

  const getPaypal = () => {
    return new Paypal()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
  })

  it('Test Create Paypal payment type', async () => {
    const paypal: Paypal = await heidelpay.createPaymentType(getPaypal()) as Paypal

    expect(paypal.getId()).toBeDefined()
  })

  it('Test Fetch Paypal payment type', async () => {
    const paypal: Paypal = await heidelpay.createPaymentType(getPaypal()) as Paypal
    const fetchPaypal: Paypal = await heidelpay.fetchPaymentType(paypal.getId()) as Paypal

    expect(fetchPaypal.getId()).toEqual(paypal.getId())
  })

  it('Test geoLocation', async () => {
    const paypal: Paypal = await heidelpay.createPaymentType(getPaypal()) as Paypal
    const fetchPaypal: Paypal = await heidelpay.fetchPaymentType(paypal.getId()) as Paypal

    expect(paypal.getGeoLocation()).toBeDefined()
    expect(fetchPaypal.getGeoLocation()).toBeDefined()
  })

  it('Test recurring', async () => {
    const paypal: Paypal = await heidelpay.createPaymentType(getPaypal()) as Paypal
    const recurring: Recurring = await heidelpay.startRecurring(paypal.getId(), TestHelper.getRequiredRecurringData())

    expect(recurring).toBeInstanceOf(Recurring)
    expect(recurring.getReturnUrl()).toBe('https://dev.unzer.com')
    expect(recurring.getRedirectUrl()).toBeDefined()
    expect(recurring.getProcessing).toBeDefined()
  })

  it('Test recurring with complete data', async () => {
    const paypal: Paypal = await heidelpay.createPaymentType(getPaypal()) as Paypal
    const recurring: Recurring = await heidelpay.startRecurring(paypal.getId(), TestHelper.getCompleteRecurringData())

    expect(recurring).toBeInstanceOf(Recurring)
    expect(recurring.getReturnUrl()).toBe('https://dev.unzer.com')
    expect(recurring.getRedirectUrl()).toBeDefined()
    expect(recurring.getResources().getCustomerId()).toBeDefined()
    expect(recurring.getResources().getMetadataId()).toBeDefined()
    expect(recurring.getProcessing).toBeDefined()
  }) 
})
