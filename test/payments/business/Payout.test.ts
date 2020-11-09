import Unzer from '../../../src/Unzer'
import * as TestHelper from '../../helpers/TestHelper'
import * as TestCustomerHelper from '../../helpers/CustomerTestHelper'
import Payout from '../../../src/payments/business/Payout'
import SepaDirectDebit from '../../../src/payments/types/SepaDirectDebit'
import SepaDirectDebitGuaranteed from '../../../src/payments/types/SepaDirectDebitGuaranteed'
import { Customer } from '../../../src/payments/Customer'
import Payment from '../../../src/payments/business/Payment'

describe('Payout test', () => {
  let unzer: Unzer
  let createPaymentTypeCard
  const { getPayout } = TestHelper
  const { createFullCustomer } = TestCustomerHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createUnzerInstance()
    createPaymentTypeCard = TestHelper.createPaymentTypeCard(unzer)
  })

  const getSepaDirectDebit = () => {
    return new SepaDirectDebit()
      .setIban("DE89370400440532013000")
      .setBic("COBADEFFXXX")
      .setHolder("Rene Felder")
  }

  const getSepaDirectDebitGuaranteed = () => {
    return new SepaDirectDebitGuaranteed()
      .setIban("DE89370400440532013000")
      .setBic("COBADEFFXXX")
      .setHolder("Rene Felder")
  }

  it('Test payout with Credit Card', async () => {
    const card = await createPaymentTypeCard()
    const payout: Payout = await unzer.payout(getPayout(card.getId()))

    expect(payout).toBeInstanceOf(Payout)
    expect(payout.getId()).toBeDefined()
    expect(payout.getAmount()).toBeDefined()
    expect(payout.getCurrency()).toBeDefined()
    expect(payout.getReturnUrl()).toBeDefined()
    expect(payout.getPaymentReference()).toBeDefined()
    expect(payout.getResources()).toBeDefined()
    expect(payout.getPayload()).toBeDefined()
  })

  it('Test payout with Sepa Direct Debit', async () => {
    const sepaDirectDebit: SepaDirectDebit = await unzer.createPaymentType(getSepaDirectDebit()) as SepaDirectDebit
    const payout: Payout = await unzer.payout(getPayout(sepaDirectDebit.getId()))

    expect(payout).toBeInstanceOf(Payout)
    expect(payout.getId()).toBeDefined()
    expect(payout.getAmount()).toBeDefined()
    expect(payout.getCurrency()).toBeDefined()
    expect(payout.getReturnUrl()).toBeDefined()
    expect(payout.getPaymentReference()).toBeDefined()
    expect(payout.getResources()).toBeDefined()
    expect(payout.getPayload()).toBeDefined()
  })

  it('Test payout with Sepa Direct Debit Guaranteed', async () => {
    const customer: Customer = await unzer.createCustomer(createFullCustomer())
    const sepaDirectDebitGuaranteed: SepaDirectDebitGuaranteed = await unzer.createPaymentType(getSepaDirectDebitGuaranteed()) as SepaDirectDebitGuaranteed
    const payout: Payout = await unzer.payout(getPayout(sepaDirectDebitGuaranteed.getId(), customer.getCustomerId()))

    expect(payout).toBeInstanceOf(Payout)
    expect(payout.getId()).toBeDefined()
    expect(payout.getAmount()).toBeDefined()
    expect(payout.getCurrency()).toBeDefined()
    expect(payout.getReturnUrl()).toBeDefined()
    expect(payout.getPaymentReference()).toBeDefined()
    expect(payout.getResources()).toBeDefined()
    expect(payout.getPayload()).toBeDefined()
  })

  it('Test fetch Payout payment', async () => {
    const card = await createPaymentTypeCard()
    const payout: Payout = await unzer.payout(getPayout(card.getId()))

    const payment: Payment = await unzer.fetchPayment(payout.getResources().getPaymentId()) as Payment

    expect(payout).toBeInstanceOf(Payout)
    expect(payment.getResources()).toBeDefined()
    expect(payout.getId()).toBeDefined()
    expect(payout.getAmount()).toBeDefined()
    expect(payout.getCurrency()).toBeDefined()
    expect(payout.getReturnUrl()).toBeDefined()
    expect(payout.getPaymentReference()).toBeDefined()
    expect(payout.getResources()).toBeDefined()
    expect(payout.getPayload()).toBeDefined()
  })

  it('Test fetch a Payout object', async () => {
    const card = await createPaymentTypeCard()
    const payout: Payout = await unzer.payout(getPayout(card.getId()))

    const fetchedPayout: Payout = await unzer.fetchPayout(payout.getResources().getPaymentId(), payout.getId()) as Payout

    expect(payout).toBeInstanceOf(Payout)
    expect(fetchedPayout).toBeInstanceOf(Payout)
    expect(fetchedPayout.getResources()).toBeDefined()
    expect(fetchedPayout.getId()).toBeDefined()
    expect(fetchedPayout.getAmount()).toBeDefined()
    expect(fetchedPayout.getCurrency()).toBeDefined()
    expect(fetchedPayout.getReturnUrl()).toBeDefined()
    expect(fetchedPayout.getPaymentReference()).toBeDefined()
    expect(fetchedPayout.getResources()).toBeDefined()
    expect(fetchedPayout.getPayload()).toBeDefined()
  })

  it('Test returned traceId', async () => {
    const card = await createPaymentTypeCard()
    const payout: Payout = await unzer.payout(getPayout(card.getId()))

    expect(payout.getResources().getTraceId()).toBeDefined()
  })
})
