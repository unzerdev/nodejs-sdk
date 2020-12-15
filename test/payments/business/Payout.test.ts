import Unzer from '../../../src/Unzer'
import * as TestHelper from '../../helpers/TestHelper'
import * as TestCustomerHelper from '../../helpers/CustomerTestHelper'
import Payout from '../../../src/payments/business/Payout'
import SepaDirectDebit from '../../../src/payments/types/SepaDirectDebit'
import SepaDirectDebitSecured from '../../../src/payments/types/SepaDirectDebitSecured'
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

  const getSepaDirectDebitSecured = () => {
    return new SepaDirectDebitSecured()
      .setIban("DE89370400440532013000")
      .setBic("COBADEFFXXX")
      .setHolder("Rene Felder")
  }

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

  it('Test payout with Sepa Direct Debit Secured', async () => {
    const customer: Customer = await unzer.createCustomer(createFullCustomer())
    const sepaDirectDebitSecured: SepaDirectDebitSecured = await unzer.createPaymentType(getSepaDirectDebitSecured()) as SepaDirectDebitSecured
    const payout: Payout = await unzer.payout(getPayout(sepaDirectDebitSecured.getId(), customer.getCustomerId()))

    expect(payout).toBeInstanceOf(Payout)
    expect(payout.getId()).toBeDefined()
    expect(payout.getAmount()).toBeDefined()
    expect(payout.getCurrency()).toBeDefined()
    expect(payout.getReturnUrl()).toBeDefined()
    expect(payout.getPaymentReference()).toBeDefined()
    expect(payout.getResources()).toBeDefined()
    expect(payout.getPayload()).toBeDefined()
  })
})
