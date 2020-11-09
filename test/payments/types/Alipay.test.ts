import Unzer from '../../../src/Unzer'
import * as TestHelper from '../../helpers/TestHelper'
import Alipay from '../../../src/payments/types/Alipay'
import Charge from '../../../src/payments/business/Charge'

describe('Payment Type Alipay Test', () => {
  let unzer: Unzer
  const {getCharge} = TestHelper

  const getAlipay = () => {
    return new Alipay()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createHeidelpayInstance()
  })

  it('Test Create Alipay payment type', async () => {
    const alipay: Alipay = await unzer.createPaymentType(getAlipay()) as Alipay

    expect(alipay.getId()).toBeDefined()
  })

  it('Test Charge Alipay', async () => {
    const alipay: Alipay = await unzer.createPaymentType(getAlipay()) as Alipay
    const charge: Charge = await unzer.charge(getCharge(alipay.getId()))

    expect(charge).toBeInstanceOf(Charge)
    expect(charge.getId()).toBeDefined()
  })

  it('Test Fetch Alipay payment type', async () => {
    const alipay: Alipay = await unzer.createPaymentType(getAlipay()) as Alipay
    const fetchAlipay: Alipay = await unzer.fetchPaymentType(alipay.getId()) as Alipay

    expect(fetchAlipay.getId()).toEqual(alipay.getId())
  })

  it('Test geoLocation', async () => {
    const alipay: Alipay = await unzer.createPaymentType(getAlipay()) as Alipay
    const fetchAlipay: Alipay = await unzer.fetchPaymentType(alipay.getId()) as Alipay
    
    expect(alipay.getGeoLocation()).toBeDefined()
    expect(fetchAlipay.getGeoLocation()).toBeDefined()
  })
})
