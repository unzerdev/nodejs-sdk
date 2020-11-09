import Card from '../../../src/payments/types/Card'
import Unzer from '../../../src/Unzer'
import Authorization  from '../../../src/payments/business/Authorization'
import Charge from '../../../src/payments/business/Charge'
import Recurring from '../../../src/payments/business/Recurring'
import * as TestHelper from '../../helpers/TestHelper'

describe('Payment Type Card Test', () => {
  let unzer: Unzer
  let createPaymentTypeCard
  const {getAuthorization, getCharge} = TestHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createHeidelpayInstance()
    createPaymentTypeCard = TestHelper.createPaymentTypeCard(unzer)
  })

  it('Test Create card with merchant NOT PCI DSS Compliant', async () => {
    let card: Card = new Card('4711100000000000', '01/2022')
    card.setCVC('123')
    card = await unzer.createPaymentType(card) as Card
    
    expect(card.getId()).toBeDefined()
  })

  it('Test Authorize card type', async () => {
    const card: Card = await createPaymentTypeCard()
    const authorize: Authorization = await card.authorize(getAuthorization(card.getId()))

    expect(authorize).toBeInstanceOf(Authorization)
    expect(authorize.getId()).toBeDefined()
  })

  it('Test Authorize card with customer Id', async () => {
    const card: Card = await createPaymentTypeCard()
    const authorize: Authorization = await card.authorize(getAuthorization(card.getId()))

    expect(authorize).toBeInstanceOf(Authorization)
    expect(authorize.getId()).toBeDefined()
    expect(authorize.getPayment()).toBeDefined()
  })

  it('Test Charge card type', async () => {
    const card: Card = await createPaymentTypeCard()
    const charge: Charge = await card.charge(getCharge(card.getId()))

    expect(charge).toBeInstanceOf(Charge)
    expect(charge.getId()).toBeDefined()
  })

  it('Test Fetch card type', async () => {
    const card: Card = await createPaymentTypeCard()
    const fetchedCard: Card = await unzer.fetchPaymentType(card.getId()) as Card

    expect(card.getId()).toEqual(fetchedCard.getId())
    expect(card.getNumber()).toBeDefined()
    expect(card.getCVC()).toBeDefined()
    expect(card.getExpiryDate()).toEqual(fetchedCard.getExpiryDate())
    expect(fetchedCard.getCardDetails()).toBeDefined()
  })

  it('Test geoLocation', async () => {
    const card: Card = await createPaymentTypeCard()
    const fetchedCard: Card = await unzer.fetchPaymentType(card.getId()) as Card

    expect(card.getGeoLocation()).toBeDefined()
    expect(fetchedCard.getGeoLocation()).toBeDefined()
  })

  it('Test recurring', async () => {
    const card: Card = await createPaymentTypeCard()
    const recurring: Recurring = await unzer.startRecurring(card.getId(), TestHelper.getRequiredRecurringData())
    await card.authorize(getAuthorization(card.getId()))
    const fetchedCard: Card = await unzer.fetchPaymentType(card.getId()) as Card

    expect(recurring).toBeInstanceOf(Recurring)
    expect(recurring.getReturnUrl()).toBe('https://dev.unzer.com')
    expect(recurring.getRedirectUrl()).toBeDefined()
    expect(recurring.getProcessing).toBeDefined()
    expect(fetchedCard.getRecurring()).toBe(true)
  })

  it('Test recurring with complete data', async () => {
    const card: Card = await createPaymentTypeCard()
    const recurring: Recurring = await unzer.startRecurring(card.getId(), TestHelper.getCompleteRecurringData())
    await card.authorize(getAuthorization(card.getId()))
    const fetchedCard: Card = await unzer.fetchPaymentType(card.getId()) as Card

    expect(recurring).toBeInstanceOf(Recurring)
    expect(recurring.getReturnUrl()).toBe('https://dev.unzer.com')
    expect(recurring.getRedirectUrl()).toBeDefined()
    expect(recurring.getResources().getCustomerId()).toBeDefined()
    expect(recurring.getResources().getMetadataId()).toBeDefined()
    expect(recurring.getProcessing).toBeDefined()
    expect(fetchedCard.getRecurring()).toBe(true)
  }) 
})
