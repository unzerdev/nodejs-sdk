import Unzer from '../../../src/Unzer'
import Charge from '../../../src/payments/business/Charge'
import Shipment from '../../../src/payments/business/Shipment'
import Basket from '../../../src/payments/Basket'
import InvoiceSecured from '../../../src/payments/types/InvoiceSecured'
import { Customer } from '../../../src/payments/Customer'
import * as TestHelper from '../../helpers/TestHelper'
import * as CustomerTestHelper from '../../helpers/CustomerTestHelper'

describe('Authorize test', () => {
  let unzer: Unzer
  const { getCharge, getChargeWithBasketId, getShipmentOrderAndInvoiceId, createBasket } = TestHelper

  const getInvoiceSecured = () => {
    return new InvoiceSecured()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createUnzerInstance()
  })

  it('Test shipment with payment type InvoiceSecured', async () => {
    const invoiceSecured: InvoiceSecured = await unzer.createPaymentType(getInvoiceSecured()) as InvoiceSecured    
    const customer: Customer = await unzer.createCustomer(CustomerTestHelper.createFullCustomer())
    const charge: Charge = await unzer.charge(getCharge(invoiceSecured.getId(), customer.getCustomerId()))

    const paymentId = charge.getResources().getPaymentId()
    const shipment: Shipment = await unzer.shipment(paymentId, getShipmentOrderAndInvoiceId())
    
    expect(shipment.getOrderId()).toBeDefined()
    expect(shipment.getInvoiceId()).toBeDefined()
  })

  it('Test shipment with payment type InvoiceSecured', async () => {
    const invoiceSecured: InvoiceSecured = await unzer.createPaymentType(getInvoiceSecured()) as InvoiceSecured
    const customer: Customer = await unzer.createCustomer(CustomerTestHelper.createFullCustomer())
    const basket: Basket = await unzer.createBasket(createBasket())
    const basketId = basket.getId()
    const charge: Charge = await unzer.charge(getChargeWithBasketId(invoiceSecured.getId(), customer.getCustomerId(), basketId))
    
    const paymentId = charge.getResources().getPaymentId()
    const shipment: Shipment = await unzer.shipment(paymentId, getShipmentOrderAndInvoiceId())

    expect(shipment.getOrderId()).toBeDefined()
    expect(shipment.getInvoiceId()).toBeDefined()
  })
})
