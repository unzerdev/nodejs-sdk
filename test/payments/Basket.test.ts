import Basket from '../../src/payments/Basket'
import Unzer from '../../src/Unzer'
import * as TestHelper from '../helpers/TestHelper'

describe('Basket test', () => {
  let unzer: Unzer
  const { createBasket, createBasketWithOneItemsForUpdate, createBasketWithTwoItemsForUpdate } = TestHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createUnzerInstance()
  })

  it('Test create a baskset', async () => {
    const basket: Basket = await unzer.createBasket(createBasket())

    expect(basket).toBeInstanceOf(Basket)
    expect(basket.getId()).toBeDefined()
  })

  it('Test create and fetch baskset', async () => {
    const basket: Basket = await unzer.createBasket(createBasket())
    const fetchedBasket: Basket = await unzer.fetchBasket(basket.getId())
    
    expect(basket).toBeInstanceOf(Basket)
    expect(fetchedBasket).toBeInstanceOf(Basket)
    expect(basket.getId()).toEqual(fetchedBasket.getId())
  })

  it('Test create and update baskset', async () => {
    const basket: Basket = await unzer.createBasket(createBasket())
    const fetchedNewBasket = await unzer.fetchBasket(basket.getId())

    const updateBasket = createBasketWithOneItemsForUpdate(fetchedNewBasket.getOrderId())

    const updatedBasket = await unzer.updateBasket(fetchedNewBasket.getId(), updateBasket)
    const fetchedUpdateBasket = await unzer.fetchBasket(updatedBasket.getId())
    
    expect(fetchedUpdateBasket.getOrderId()).toEqual(updateBasket.getOrderId())
    expect(fetchedUpdateBasket.getNote()).toEqual(updateBasket.getNote())
  })

  it('Test create and update baskset item', async () => {
    const basket: Basket = await unzer.createBasket(createBasket())
    const fetchedNewBasket = await unzer.fetchBasket(basket.getId())

    const updateBasket = createBasketWithTwoItemsForUpdate(fetchedNewBasket.getOrderId())

    const updatedBasket = await unzer.updateBasket(fetchedNewBasket.getId(), updateBasket)
    const fetchedUpdateBasket = await unzer.fetchBasket(updatedBasket.getId())
    
    expect(fetchedNewBasket.getItems()).toHaveLength(1)
    expect(fetchedUpdateBasket.getItems()).toHaveLength(2)
  })

  it('should return at least 13 keys inside basketItemObject', async () => {
    const basket: Basket = await unzer.createBasket(createBasket())
    const fetchedNewBasket: Basket = await unzer.fetchBasket(basket.getId())
    const basketPayload: object = fetchedNewBasket.getPayload()
    const basketItem: [] = basketPayload['basketItems'][0]
    const basketItemKeys = Object.keys(basketItem)
    const basketItemKeyArray: Array<string> = [
      'title', 'subTitle', 'imageUrl', 'basketItemReferenceId', 'unit',
      'quantity', 'amountDiscount', 'vat', 'amountGross', 'amountVat',
      'amountPerUnit', 'amountNet', 'type'
    ]

    expect(basketItemKeys.length).toBeGreaterThanOrEqual(13)
    expect(basketItemKeys).toEqual(expect.arrayContaining(basketItemKeyArray))
  })
})
