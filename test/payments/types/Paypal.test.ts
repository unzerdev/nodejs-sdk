import Unzer from '../../../src/Unzer'
import Metadata from '../../../src/payments/Metadata'
import { Customer } from '../../../src/payments/Customer'
import * as TestHelper from '../../helpers/TestHelper'
import * as CustomerTestHelper from '../../helpers/CustomerTestHelper'
import Paypal from '../../../src/payments/types/Paypal'
import Recurring, {recurringObject} from '../../../src/payments/business/Recurring'

describe('Payment Type Paypal Test', () => {
  let unzer: Unzer

  const getPaypal = () => {
    return new Paypal()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createUnzerInstance()
  })

  it('Test Create Paypal payment type', async () => {
    const paypal: Paypal = await unzer.createPaymentType(getPaypal()) as Paypal

    expect(paypal.getId()).toBeDefined()
  })

  it('Test Fetch Paypal payment type', async () => {
    const paypal: Paypal = await unzer.createPaymentType(getPaypal()) as Paypal
    const fetchPaypal: Paypal = await unzer.fetchPaymentType(paypal.getId()) as Paypal

    expect(fetchPaypal.getId()).toEqual(paypal.getId())
  })

  it('Test geoLocation', async () => {
    const paypal: Paypal = await unzer.createPaymentType(getPaypal()) as Paypal
    const fetchPaypal: Paypal = await unzer.fetchPaymentType(paypal.getId()) as Paypal

    expect(paypal.getGeoLocation()).toBeDefined()
    expect(fetchPaypal.getGeoLocation()).toBeDefined()
  })

  it('Test recurring', async () => {
    const paypal: Paypal = await unzer.createPaymentType(getPaypal()) as Paypal
    const recurring: Recurring = await unzer.startRecurring(paypal.getId(), TestHelper.getRequiredRecurringData())

    expect(recurring).toBeInstanceOf(Recurring)
    expect(recurring.getReturnUrl()).toBe('https://dev.unzer.com')
    expect(recurring.getRedirectUrl()).toBeDefined()
    expect(recurring.getProcessing).toBeDefined()
  })

  it('Test recurring with complete data', async () => {
    const createCustomer = CustomerTestHelper.createCustomer(unzer)
    const metadata: Metadata = await unzer.createMetadata(TestHelper.createMetadataValue())
    const customer: Customer = await createCustomer()

    const recurringPayload: recurringObject = {
      returnUrl: 'https://dev.unzer.com',
      customerId: customer.getCustomerId(),
      metadataId: metadata.getId(),
    }

    const paypal: Paypal = await unzer.createPaymentType(getPaypal()) as Paypal
    const recurring: Recurring = await unzer.startRecurring(paypal.getId(), recurringPayload)

    expect(recurring).toBeInstanceOf(Recurring)
    expect(recurring.getReturnUrl()).toBe('https://dev.unzer.com')
    expect(recurring.getRedirectUrl()).toBeDefined()
    expect(recurring.getResources().getCustomerId()).toBeDefined()
    expect(recurring.getResources().getMetadataId()).toBeDefined()
    expect(recurring.getProcessing).toBeDefined()
  }) 
})
