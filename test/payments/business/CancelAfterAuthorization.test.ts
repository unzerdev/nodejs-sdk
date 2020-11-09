import Unzer from '../../../src/Unzer'
import Authorization from '../../../src/payments/business/Authorization'
import Cancel from '../../../src/payments/business/Cancel'
import * as TestHelper from '../../helpers/TestHelper'

describe('Cancel after authorize test', () => {
  let unzer: Unzer
  let createPaymentTypeCard
  const { getAuthorization, getCancelAuthorization } = TestHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createUnzerInstance()
    createPaymentTypeCard = TestHelper.createPaymentTypeCard(unzer)
  })

  it('Test fetch authorization', async () => {
    const card = await createPaymentTypeCard()
    const authorize: Authorization = await unzer.authorize(getAuthorization(card.getId()))
    const authorization: Authorization = await unzer.fetchAuthorization(authorize.getResources().getPaymentId())

    expect(authorization).toBeInstanceOf(Authorization)
  })

  it('Test Full cancel (reversal) after authorize', async () => {
    const card = await createPaymentTypeCard()
    const authorize: Authorization = await unzer.authorize(getAuthorization(card.getId()))
    const cancelAuthorize: Cancel = await authorize.cancel()

    expect(cancelAuthorize).toBeInstanceOf(Cancel)
    expect(cancelAuthorize.getId()).toBeDefined()
    expect(cancelAuthorize.getPayload()).toBeDefined()
  })

  it('Test reversal partial after authorize', async () => {
    const card = await createPaymentTypeCard()
    const authorize: Authorization = await unzer.authorize(getAuthorization(card.getId()))
    const cancelAuthorize: Cancel = await authorize.cancel(50)

    expect(cancelAuthorize).toBeInstanceOf(Cancel)
    expect(cancelAuthorize.getAmount()).toEqual("50.0000")
  })

  it('Test reversal partial after authorize with Unzer', async () => {
    const card = await createPaymentTypeCard()
    const authorize: Authorization = await unzer.authorize(getAuthorization(card.getId()))

    const cancelAuthorize: Cancel = await unzer.cancelAuthorization(getCancelAuthorization(authorize.getResources().getPaymentId(), authorize.getId(), 50))

    expect(cancelAuthorize).toBeInstanceOf(Cancel)
    expect(cancelAuthorize.getAmount()).toEqual("50.0000")
  })

  it('Test fetch cancel with Unzer', async () => {
    const card = await createPaymentTypeCard()
    const authorize: Authorization = await unzer.authorize(getAuthorization(card.getId()))

    const cancelAuthorize: Cancel = await unzer.cancelAuthorization({
      amount: 50,
      authorizationId: authorize.getId(),
      paymentId: authorize.getResources().getPaymentId()
    })

    const cancel: Cancel = await unzer.fetchCancel(authorize.getResources().getPaymentId(), cancelAuthorize.getId());
    expect(cancel.getId()).toBeDefined()
  })

  it('Test fetch cancel by refund Id with Unzer', async () => {
    const card = await createPaymentTypeCard()
    const authorize: Authorization = await unzer.authorize(getAuthorization(card.getId()))

    const cancelAuthorize: Cancel = await unzer.cancelAuthorization({
      amount: 50,
      authorizationId: authorize.getId(),
      paymentId: authorize.getResources().getPaymentId()
    })

    const cancel: Cancel = await unzer.fetchCancel(authorize.getResources().getPaymentId(), cancelAuthorize.getId(), authorize.getId());
    expect(cancel.getId()).toBeDefined()
  })

  it('Test returned traceId', async () => {
    const card = await createPaymentTypeCard()
    const authorize: Authorization = await unzer.authorize(getAuthorization(card.getId()))

    const cancelAuthorize: Cancel = await unzer.cancelAuthorization({
      amount: 50,
      authorizationId: authorize.getId(),
      paymentId: authorize.getResources().getPaymentId()
    })

    expect(cancelAuthorize.getResources().getTraceId()).toBeDefined()
  })
})
