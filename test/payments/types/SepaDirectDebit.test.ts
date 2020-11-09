import Unzer from '../../../src/Unzer'
import * as TestHelper from '../../helpers/TestHelper'
import SepaDirectDebit from '../../../src/payments/types/SepaDirectDebit'

describe('Payment Type SepaDirectDebit Test', () => {
  let unzer: Unzer

  const getSepaDirectDebitConstructor = () => {
    return new SepaDirectDebit("DE89370400440532013000")
      .setBic("COBADEFFXXX")
      .setHolder("Rene Felder")
  }

  const getSepaDirectDebit = () => {
    return new SepaDirectDebit()
      .setIban("DE89370400440532013000")
      .setBic("COBADEFFXXX")
      .setHolder("Rene Felder")
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createUnzerInstance()
  })

  it('Test Create SepaDirectDebit payment type', async () => {
    const sepaDirectDebit: SepaDirectDebit = await unzer.createPaymentType(getSepaDirectDebitConstructor()) as SepaDirectDebit

    expect(sepaDirectDebit.getId()).toBeDefined()
  })

  it('Test Fetch SepaDirectDebit payment type', async () => {
    const sepaDirectDebit: SepaDirectDebit = await unzer.createPaymentType(getSepaDirectDebit()) as SepaDirectDebit
    const fetchSepaDirectDebit: SepaDirectDebit = await unzer.fetchPaymentType(sepaDirectDebit.getId()) as SepaDirectDebit

    expect(fetchSepaDirectDebit.getId()).toEqual(sepaDirectDebit.getId())
  })

  it('Test geoLocation', async () => {
    const sepaDirectDebit: SepaDirectDebit = await unzer.createPaymentType(getSepaDirectDebit()) as SepaDirectDebit
    const fetchSepaDirectDebit: SepaDirectDebit = await unzer.fetchPaymentType(sepaDirectDebit.getId()) as SepaDirectDebit

    expect(sepaDirectDebit.getGeoLocation()).toBeDefined()
    expect(fetchSepaDirectDebit.getGeoLocation()).toBeDefined()
  })
})
