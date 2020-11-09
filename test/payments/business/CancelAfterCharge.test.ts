import Unzer from '../../../src/Unzer'
import Charge from '../../../src/payments/business/Charge'
import Cancel from '../../../src/payments/business/Cancel'
import * as TestHelper from '../../helpers/TestHelper'

describe('Cancel after charge test', () => {
  let unzer: Unzer
  let createPaymentTypeCard
  const { getCharge, getCancelCharge } = TestHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createUnzerInstance()
    createPaymentTypeCard = TestHelper.createPaymentTypeCard(unzer)
  })

  it('Test fetch charge with Id', async () => {
    const card = await createPaymentTypeCard()
    const charge: Charge = await unzer.charge(getCharge(card.getId()))
    const fetchCharge: Charge = await unzer.fetchCharge(charge.getResources().getPaymentId(), charge.getId())

    expect(charge).toBeInstanceOf(Charge)
    expect(charge.getId()).toEqual(fetchCharge.getId())
  })

  it('Test full refund with Id', async () => {
    const card = await createPaymentTypeCard()
    const charge: Charge = await unzer.charge(getCharge(card.getId()))
    const cancel: Cancel = await unzer.cancelCharge(getCancelCharge(charge.getResources().getPaymentId(), charge.getId()))

    expect(cancel).toBeInstanceOf(Cancel)
    expect(cancel.getId()).toBeDefined()
    expect(cancel.getPayload()).toBeDefined()
  })

  it('Test full refund with charge', async () => {
    const card = await createPaymentTypeCard()
    const charge: Charge = await unzer.charge(getCharge(card.getId()))
    const fetchCharge: Charge = await unzer.fetchCharge(charge.getResources().getPaymentId(), charge.getId())
    const cancel: Cancel = await fetchCharge.cancel()

    expect(cancel).toBeInstanceOf(Cancel)
    expect(cancel.getId()).toBeDefined()
    expect(cancel.getPayload()).toBeDefined()
  })

  it('Test partial refund with Id', async () => {
    const card = await createPaymentTypeCard()
    const charge: Charge = await unzer.charge(getCharge(card.getId()))
    const cancel: Cancel = await unzer.cancelCharge(getCancelCharge(charge.getResources().getPaymentId(), charge.getId(), 10))

    expect(cancel).toBeInstanceOf(Cancel)
    expect(cancel.getId()).toBeDefined()
    expect(cancel.getPayload()).toBeDefined()
  })

  it('Test partial refund with charge', async () => {
    const card = await createPaymentTypeCard()
    const charge: Charge = await unzer.charge(getCharge(card.getId()))
    const fetchCharge: Charge = await unzer.fetchCharge(charge.getResources().getPaymentId(), charge.getId())
    const cancel: Cancel = await fetchCharge.cancel(10)

    expect(cancel).toBeInstanceOf(Cancel)
    expect(cancel.getId()).toBeDefined()
    expect(cancel.getPayload()).toBeDefined()
  })

  it('Test returned traceId', async () => {
    const card = await createPaymentTypeCard()
    const charge: Charge = await unzer.charge(getCharge(card.getId()))
    const cancel: Cancel = await unzer.cancelCharge(getCancelCharge(charge.getResources().getPaymentId(), charge.getId(), 10))

    expect(cancel.getResources().getTraceId()).toBeDefined()
  })
})
