import Unzer from '../../../src/Unzer'
import * as TestHelper from '../../helpers/TestHelper'
import WechatPay from '../../../src/payments/types/WechatPay'
import Charge from '../../../src/payments/business/Charge'

describe('Payment Type WechatPay Test', () => {
  let unzer: Unzer
  const {getCharge} = TestHelper

  const getWechatPay = () => {
    return new WechatPay()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createHeidelpayInstance()
  })

  it('Test Create WechatPay payment type', async () => {
    const wechatPay: WechatPay = await unzer.createPaymentType(getWechatPay()) as WechatPay

    expect(wechatPay.getId()).toBeDefined()
  })

  it('Test Charge WechatPay', async () => {
    const wechatPay: WechatPay = await unzer.createPaymentType(getWechatPay()) as WechatPay
    const charge: Charge = await unzer.charge(getCharge(wechatPay.getId()))

    expect(charge).toBeInstanceOf(Charge)
    expect(charge.getId()).toBeDefined()
  })

  it('Test Fetch WechatPay payment type', async () => {
    const wechatPay: WechatPay = await unzer.createPaymentType(getWechatPay()) as WechatPay
    const fetchWechatPay: WechatPay = await unzer.fetchPaymentType(wechatPay.getId()) as WechatPay

    expect(fetchWechatPay.getId()).toEqual(wechatPay.getId())
  })

  it('Test geoLocation', async () => {
    const wechatPay: WechatPay = await unzer.createPaymentType(getWechatPay()) as WechatPay
    const fetchWechatPay: WechatPay = await unzer.fetchPaymentType(wechatPay.getId()) as WechatPay

    expect(wechatPay.getGeoLocation()).toBeDefined()
    expect(fetchWechatPay.getGeoLocation()).toBeDefined()
  })
})
