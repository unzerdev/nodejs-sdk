import Unzer from '../../../src/Unzer'
import Charge from '../../../src/payments/business/Charge'
import { Customer } from '../../../src/payments/Customer'
import * as TestHelper from '../../helpers/TestHelper'
import * as CustomerTestHelper from '../../helpers/CustomerTestHelper'

describe('Charge test', () => {
  let unzer: Unzer
  let createPaymentTypeCard
  let createCustomer
  const { getCharge, getChargeWithOrderAndInvoiceId } = TestHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createUnzerInstance()
    createPaymentTypeCard = TestHelper.createPaymentTypeCard(unzer)
    createCustomer = CustomerTestHelper.createCustomer(unzer)
  })

  it('Test charge with typeId', async () => {
    const card = await createPaymentTypeCard()
    const charge: Charge = await unzer.charge(getCharge(card.getId()))

    expect(charge.getId()).toBeDefined()
    expect(charge.getAmount()).toBeDefined()
    expect(charge.getCurrency()).toBeDefined()
    expect(charge.getReturnUrl()).toBeDefined()
    expect(charge.getPayload()).toBeDefined()
    expect(charge.getProcessing().getShortId()).toBeDefined()
    expect(charge.getProcessing().getUniqueId()).toBeDefined()
  })

  it('Test charge with typeId and Order Id', async () => {
    const card = await createPaymentTypeCard()
    const chargeObject = getCharge(card.getId())
    const charge: Charge = await unzer.charge(chargeObject)

    expect(chargeObject.orderId).toEqual(charge.getOrderId())
    expect(charge.getId()).toBeDefined()
    expect(charge.getAmount()).toBeDefined()
    expect(charge.getCurrency()).toBeDefined()
    expect(charge.getReturnUrl()).toBeDefined()
    expect(charge.getPayload()).toBeDefined()
    expect(charge.getProcessing().getShortId()).toBeDefined()
    expect(charge.getProcessing().getUniqueId()).toBeDefined()
  })

  it('Test charge with payment type', async () => {
    const card = await createPaymentTypeCard()
    const charge: Charge = await unzer.charge(getCharge(card))

    expect(charge.getId()).toBeDefined()
  })

  it('Test charge with order and invoice Id', async () => {
    const card = await createPaymentTypeCard()
    const charge: Charge = await unzer.charge(getChargeWithOrderAndInvoiceId(card))

    expect(charge.getId()).toBeDefined()
    expect(charge.getInvoiceId()).toBeDefined()
    expect(charge.getOrderId()).toBeDefined()
  })

  it('Test charge with customer', async () => {
    const card = await createPaymentTypeCard()
    const customer = await createCustomer(true) as Customer

    const charge: Charge = await unzer.charge(getCharge(card, customer))
    expect(charge.getId()).toBeDefined()
    expect(charge.getResources().getCustomerId()).toBeDefined()
    expect(charge.getResources().getPaymentId()).toBeDefined()
    expect(charge.getResources().getTypeId()).toBeDefined()
  })

  it('Test charge with customer Id', async () => {
    const card = await createPaymentTypeCard(true)
    const customer = await createCustomer(true) as Customer

    const charge: Charge = await unzer.charge(getCharge(card, customer.getCustomerId()))
    expect(charge.getId()).toBeDefined()
    expect(charge.getPayload()).toBeDefined()
  })

  it('Test charge with return payment', async () => {
    const card = await createPaymentTypeCard()
    const charge: Charge = await unzer.charge(getCharge(card))

    expect(charge.getId()).toBeDefined()
    expect(charge.getPayment()).toBeDefined()
    expect(charge.getPayment().getId()).toBeDefined()
    expect(charge.getPayload()).toBeDefined()
  })

  it('Test returned traceId', async () => {
    const card = await createPaymentTypeCard()
    const charge: Charge = await unzer.charge(getCharge(card))

    expect(charge.getResources().getTraceId()).toBeDefined()
  })
})
