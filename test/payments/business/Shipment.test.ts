import Unzer from '../../../src/Unzer'
import Charge from '../../../src/payments/business/Charge'
import Shipment from '../../../src/payments/business/Shipment'
import Basket from '../../../src/payments/Basket'
import InvoiceGuaranteed from '../../../src/payments/types/InvoiceGuaranteed'
import InvoiceFactoring from '../../../src/payments/types/InvoiceFactoring'
import { Customer } from '../../../src/payments/Customer'
import * as TestHelper from '../../helpers/TestHelper'
import * as CustomerTestHelper from '../../helpers/CustomerTestHelper'

describe('Authorize test', () => {
  let unzer: Unzer
  const { getCharge, getChargeWithBasketId, getShipmentOrderAndInvoiceId, createBasket } = TestHelper

  const getInvoiceGuaranteed = () => {
    return new InvoiceGuaranteed()
  }

  const getInvoiceFactoring = () => {
    return new InvoiceFactoring()
  }

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createHeidelpayInstance()
  })

  it('Test shipment with payment type InvoiceGuaranteed', async () => {
    const invoiceGuaranteed: InvoiceGuaranteed = await unzer.createPaymentType(getInvoiceGuaranteed()) as InvoiceGuaranteed    
    const customer: Customer = await unzer.createCustomer(CustomerTestHelper.createFullCustomer())
    const charge: Charge = await unzer.charge(getCharge(invoiceGuaranteed.getId(), customer.getCustomerId()))

    const paymentId = charge.getResources().getPaymentId()
    const shipment: Shipment = await unzer.shipment(paymentId, getShipmentOrderAndInvoiceId())
    
    expect(shipment.getOrderId()).toBeDefined()
    expect(shipment.getInvoiceId()).toBeDefined()
  })

  it('Test shipment with payment type InvoiceGuaranteed', async () => {
    const invoiceFactoring: InvoiceFactoring = await unzer.createPaymentType(getInvoiceFactoring()) as InvoiceFactoring
    const customer: Customer = await unzer.createCustomer(CustomerTestHelper.createFullCustomer())
    const basket: Basket = await unzer.createBasket(createBasket())
    const basketId = basket.getId()
    const charge: Charge = await unzer.charge(getChargeWithBasketId(invoiceFactoring.getId(), customer.getCustomerId(), basketId))
    
    const paymentId = charge.getResources().getPaymentId()
    const shipment: Shipment = await unzer.shipment(paymentId, getShipmentOrderAndInvoiceId())

    expect(shipment.getOrderId()).toBeDefined()
    expect(shipment.getInvoiceId()).toBeDefined()
  })

  it('Test returned traceId', async () => {
    const invoiceGuaranteed: InvoiceGuaranteed = await unzer.createPaymentType(getInvoiceGuaranteed()) as InvoiceGuaranteed
    const customer: Customer = await unzer.createCustomer(CustomerTestHelper.createFullCustomer())
    const charge: Charge = await unzer.charge(getCharge(invoiceGuaranteed.getId(), customer.getCustomerId()))

    const paymentId = charge.getResources().getPaymentId()
    const shipment: Shipment = await unzer.shipment(paymentId, getShipmentOrderAndInvoiceId())

    expect(shipment.getResources().getTraceId()).toBeDefined()
  })
})
