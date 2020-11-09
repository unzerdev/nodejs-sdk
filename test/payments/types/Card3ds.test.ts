import Card from '../../../src/payments/types/Card'
import Unzer from '../../../src/Unzer'
import Authorization  from '../../../src/payments/business/Authorization'
import Charge from '../../../src/payments/business/Charge'
import * as TestHelper from '../../helpers/TestHelper'

describe('Payment Type Card Test', () => {
  let unzer: Unzer
  let createPaymentTypeCard3ds
  const {getAuthorization, getChargeWithCard3ds} = TestHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createUnzerInstance()
    createPaymentTypeCard3ds = TestHelper.createPaymentTypeCard3ds(unzer)
  })

  it('Test Create card with merchant NOT PCI DSS Compliant', async () => {
    let card: Card = new Card('4711100000000000', '01/2022')
    card.setCVC('123')
    card.set3ds(true)
    card = await unzer.createPaymentType(card) as Card
    
    expect(card.getId()).toBeDefined()
    expect(card.get3ds()).toBeTruthy()
  })

  it('Test Authorize card type', async () => {
    const card: Card = await createPaymentTypeCard3ds()
    const authorize: Authorization = await card.authorize(getAuthorization(card.getId()))

    expect(authorize).toBeInstanceOf(Authorization)
    expect(authorize.getId()).toBeDefined()
  })

  it('Test Authorize card with customer Id', async () => {
    const card: Card = await createPaymentTypeCard3ds()
    const authorize: Authorization = await card.authorize(getAuthorization(card.getId()))

    expect(authorize).toBeInstanceOf(Authorization)
    expect(authorize.getId()).toBeDefined()
    expect(authorize.getPayment()).toBeDefined()
  })

  it('Test Charge card type', async () => {
    const card: Card = await createPaymentTypeCard3ds()
    const charge: Charge = await card.charge(getChargeWithCard3ds(card.getId()))

    expect(charge).toBeInstanceOf(Charge)
    expect(charge.getId()).toBeDefined()
  })

  it('Test Fetch card type', async () => {
    const card: Card = await createPaymentTypeCard3ds()
    const fetchedCard: Card = await unzer.fetchPaymentType(card.getId()) as Card

    expect(card.getId()).toEqual(fetchedCard.getId())
    expect(card.getNumber()).toBeDefined()
    expect(card.getCVC()).toBeDefined()
    expect(card.getExpiryDate()).toEqual(fetchedCard.getExpiryDate())
  })

  it('Test geoLocation', async () => {
    const card: Card = await createPaymentTypeCard3ds()
    const fetchedCard: Card = await unzer.fetchPaymentType(card.getId()) as Card

    expect(card.getGeoLocation()).toBeDefined()
    expect(fetchedCard.getGeoLocation()).toBeDefined()
  })
})
