import Unzer from '../../../src/Unzer'
import Authorization from '../../../src/payments/business/Authorization'
import Payment from '../../../src/payments/business/Payment'
import * as TestHelper from '../../helpers/TestHelper'

describe('Payment Test', () => {
  let unzer: Unzer
  let createPaymentTypeCard

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createHeidelpayInstance()
    createPaymentTypeCard = TestHelper.createPaymentTypeCard(unzer)
  })

  it('Unzer is instantiable', () => {
    expect(unzer).toBeInstanceOf(Unzer)
  })

  it('Test returned traceId', async () => {
    const card = await createPaymentTypeCard(true)
    const authorizeObject = TestHelper.getAuthorizationWithOrderId(card)
    const authorize: Authorization = await unzer.authorize(authorizeObject)
    const payment: Payment = await unzer.fetchPayment(authorize.getResources().getPaymentId()) as Payment

    expect(payment.getResources().getTraceId()).toBeDefined()
  })
})
