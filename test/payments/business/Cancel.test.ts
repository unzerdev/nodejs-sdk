import Unzer from '../../../src/Unzer'
import Charge from '../../../src/payments/business/Charge'
import Cancel from '../../../src/payments/business/Cancel'
import * as TestHelper from '../../helpers/TestHelper'
import Card from '../../../src/payments/types/Card';
import Authorization from '../../../src/payments/business/Authorization';

describe('Cancel test', () => {
  let unzer: Unzer
  let createPaymentTypeCard
  const { getCharge, getAuthorization } = TestHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createUnzerInstance()
    createPaymentTypeCard = TestHelper.createPaymentTypeCard(unzer)
  })

  it('Test fetch cancel authorize with Unzer', async () => {
    const card: Card = await createPaymentTypeCard()
    const authorization: Authorization = await unzer.authorize(getAuthorization(card.getId()))
    const cancelAuthorize: Cancel = await authorization.cancel()
    const cancel: Cancel = await unzer.fetchCancel(authorization.getResources().getPaymentId(), cancelAuthorize.getId(), authorization.getId());

    expect(cancel).toBeInstanceOf(Cancel)
    expect(cancel.getAmount()).toEqual("100.0000")
    expect(cancel.getId()).toEqual(cancelAuthorize.getId())
    expect(cancel.getProcessing().getShortId()).toBeDefined()
    expect(cancel.getProcessing().getUniqueId()).toBeDefined()
    expect(cancel.getResources()).toBeDefined()
    expect(cancel.getPayload()).toBeDefined()
  })

  it('Test fetch cancel authorize with Payment', async () => {
    const card: Card = await createPaymentTypeCard()
    const authorization: Authorization = await unzer.authorize(getAuthorization(card.getId()))
    const cancelAuthorize: Cancel = await authorization.cancel()
    const cancelList: Array<Cancel> = cancelAuthorize.getPayment().getCancelList()

    expect(cancelList.length).toEqual(1)
  })

  it('Test fetch cancel charge with Unzer', async () => {
    const card = await createPaymentTypeCard()
    const charge: Charge = await unzer.charge(getCharge(card.getId()))
    const cancelCharge: Cancel = await charge.cancel()
    const cancel: Cancel = await unzer.fetchCancel(cancelCharge.getResources().getPaymentId(), cancelCharge.getId(), charge.getId());

    expect(cancel).toBeInstanceOf(Cancel)
    expect(cancel.getId()).toEqual(cancelCharge.getId())
    expect(cancel.getPayload()).toBeDefined()
  })

  it('Test fetch cancel charge with Payment', async () => {
    const card: Card = await createPaymentTypeCard()
    const charge: Charge = await unzer.charge(getCharge(card.getId()))
    const cancelCharge: Cancel = await charge.cancel()

    const fetchCharge = await unzer.fetchCharge(charge.getResources().getPaymentId(), charge.getId())

    const cancel: Cancel = fetchCharge.getCancel(cancelCharge.getId())
    const cancelList: Array<Cancel> = cancelCharge.getPayment().getCancelList()

    expect(cancel.getId()).toEqual(cancelCharge.getId())
    expect(cancelList.length).toEqual(1)
  })

  it('Test returned traceId', async () => {
    const card: Card = await createPaymentTypeCard()
    const charge: Charge = await unzer.charge(getCharge(card.getId()))
    const cancelCharge: Cancel = await charge.cancel()

    expect(cancelCharge.getResources().getTraceId()).toBeDefined()
  })
})
