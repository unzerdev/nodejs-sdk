import { FetchAdapter } from '../adapters/FetchAdapter'
import Unzer from '../Unzer'
import PaymentType from '../payments/types/PaymentType'
import { Customer } from '../payments/Customer'
import Metadata from '../payments/Metadata'
import Basket from '../payments/Basket'
import Authorization, { authorizeObject, chargeAuthorizeObject } from '../payments/business/Authorization'
import Cancel, { cancelAuthorizeObject, cancelChargeObject } from '../payments/business/Cancel'
import Charge, { chargeObject } from '../payments/business/Charge'
import Paypage from '../payments/paypage/Paypage'
import Linkpay from '../payments/paypage/Linkpay'
import Payment from '../payments/business/Payment'
import CreatePaymentType from './CreatePaymentType'
import FetchPayment from './FetchPayment'
import FetchPaymentType from './FetchPaymentType'
import CreateCustomer from './CreateCustomer'
import UpdateCustomer from './UpdateCustomer'
import DeleteCustomer from './DeleteCustomer'
import FetchCustomer from './FetchCustomer'
import CreateMetadata from './CreateMetadata'
import FetchMetadata from './FetchMetadata'
import CreateBasket from './CreateBasket'
import FetchBasket from './FetchBasket'
import UpdateBasket from './UpdateBasket'
import CreateRecurring from './CreateRecurring'
import AuthorizationService from './Authorization'
import ChargeService from './Charge'
import ChargeAuthorization from './ChargeAuthorization'
import CancelAuthorization from './CancelAuthorization'
import CancelCharge from './CancelCharge'
import AbstractPaymentType from '../payments/types/AbstractPaymentType'
import Shipment, { shipmentObject } from '../payments/business/Shipment'
import ShipmentService from './Shipment'
import InitPaypage from './InitPaypage'
import InitLinkpay from './InitLinkpay'
import UpdateLinkpay from './UpdateLinkpay'
import DeleteLinkpay from './DeleteLinkpay'
import PayoutService from './Payout'
import Payout, { payoutObject } from '../payments/business/Payout'
import Recurring, { recurringObject } from '../payments/business/Recurring'
import FetchPayout from './FetchPayout'
import HirePurchasePlan from '../payments/types/HirePurchasePlan'
import HirePurchase, { updateHirePurchaseObject } from '../payments/types/HirePurchase'
import FetchHirePurchasePlan from './FetchHirePurchasePlan'
import UpdateHirePurchase from './UpdateHirePurchase'
import Webhook, { webhookObject } from '../payments/business/Webhook'
import RegisterWebhook from './RegisterWebhook'
import FetchWebhook from './FetchWebhook'
import UpdateWebhook from './UpdateWebhook'
import DeleteWebhook from './DeleteWebhook'

export default class PaymentService {
  private requestAdapter: FetchAdapter
  private unzer: Unzer

  constructor(unzer: Unzer, locale?: string, env?: string) {
    this.unzer = unzer
    this.requestAdapter = new FetchAdapter(locale, env)
  }

  /**
   * Get Unzer instance
   *
   * @returns {Unzer}
   */
  public getUnzer(): Unzer {
    return this.unzer
  }

  /**
   * Get request adapter
   *
   * @returns {FetchAdapter}
   */
  public getRequestAdapter(): FetchAdapter {
    return this.requestAdapter
  }

  /**
   * Create payment type
   *
   * @param {PaymentType} paymentType
   * @returns {Promise<PaymentType>}
   */
  public createPaymentType(paymentType: AbstractPaymentType): Promise<PaymentType> {
    return CreatePaymentType(paymentType, this)
  }

  /**
   * Fetch a payment
   *
   * @param {string} paymentId
   * @returns {Promise<Payment>}
   */
  public fetchPayment(paymentId: string): Promise<Payment> {
    return FetchPayment(paymentId, this)
  }

  /**
   * Fetch a payment type
   *
   * @param {string} paymentTypeId
   * @returns {Promise<PaymentType>}
   */
  public fetchPaymentType(paymentTypeId: string): Promise<PaymentType> {
    return FetchPaymentType(paymentTypeId, this)
  }

  /**
   * Create customer
   *
   * @param {Customer} customer
   * @returns {Promise<Customer>}
   */
  public createCustomer(customer: Customer): Promise<Customer> {
    return CreateCustomer(customer, this)
  }

  /**
   * Fetch customer info by customer Id
   *
   * @param {string} customerId
   * @returns {Promise<Customer>}
   */
  public fetchCustomer(customerId: string): Promise<Customer> {
    return FetchCustomer(customerId, this)
  }

  /**
   * Update data customer
   *
   * @param {string} customerId
   * @param {Customer} customer
   * @returns {Promise<Customer>}
   */
  public updateCustomer(customerId: string, customer: Customer): Promise<Customer> {
    return UpdateCustomer(customerId, customer, this)
  }

  /**
   * Delete a customer
   *
   * @param {string} customerId
   * @returns {Promise<boolean>}
   */
  public deleteCustomer(customerId: string): Promise<boolean> {
    return DeleteCustomer(customerId, this)
  }

  /**
   * Create metadata
   *
   * @param {Metadata} metadata
   * @returns {Promise<Metadata>}
   */
  public createMetadata(metadata: Metadata): Promise<Metadata> {
    return CreateMetadata(metadata, this)
  }

  /**
   * Fetch metadata
   *
   * @param {Metadata} metadata
   * @returns {Promise<Metadata>}
   */
  public fetchMetadata(metadataId: string): Promise<Metadata> {
    return FetchMetadata(metadataId, this)
  }

  /**
   * Create basket
   *
   * @param {Basket} baskset
   * @returns {Promise<Basket>}
   */
  public createBasket(basket: Basket): Promise<Basket> {
    return CreateBasket(basket, this)
  }

  /**
   * Fetch basket
   *
   * @param {Basket} baskset
   * @returns {Promise<Basket>}
   */
  public fetchBasket(basketId: string): Promise<Basket> {
    return FetchBasket(basketId, this)
  }

  /**
   * Fetch basket
   *
   * @param {Basket} baskset
   * @returns {Promise<Basket>}
   */
  public updateBasket(basketId: string, basket: Basket): Promise<Basket> {
    return UpdateBasket(basketId, basket, this)
  }

  /**
   * Authorize a payment
   *
   * @param {authorizeObject} args
   * @returns {Promise<Authorization>}
   */
  public authorize(args: authorizeObject): Promise<Authorization> {
    return AuthorizationService(args, this)
  }

  /**
   * Charge a payment
   *
   * @param {chargeObject} args
   * @returns {Promise<Charge>}
   */
  public charge(args: chargeObject): Promise<Charge> {
    return ChargeService(args, this)
  }

  /**
   * Charge after authorization
   *
   * @param {chargeAuthorizeObject} args
   * @returns {Promise<Charge>}
   */
  public chargeAuthorization(args: chargeAuthorizeObject): Promise<Charge> {
    return ChargeAuthorization(args, this)
  }

  /**
   * Reversal a payment
   *
   * @param {cancelAuthorizeObject} args
   * @returns {Promise<Cancel>}
   */
  public cancelAuthorization(args: cancelAuthorizeObject): Promise<Cancel> {
    return CancelAuthorization(args, this)
  }

  /**
   * Refund a payment
   *
   * @param {cancelChargeObject} args
   * @returns {Promise<Cancel>}
   */
  public cancelCharge(args: cancelChargeObject): Promise<Cancel> {
    return CancelCharge(args, this)
  }

  /**
   * Shipment
   *
   * @param {string} paymentId
   * @returns {Promise<Shipment>}
   */
  public shipment(paymentId: string, args: shipmentObject): Promise<Shipment> {
    return ShipmentService(paymentId, args, this)
  }

  /**
   * Init authorize paypage
   * 
   * @param {Paypage} paypage
   * @returns {Promise<Paypage>}
   */
  public initAuthorizePaypage(paypage: Paypage): Promise<Paypage> {
    return InitPaypage(paypage, 'authorize', this)
  }

  /**
   * Init charge paypage
   *
   * @param {Paypage} paypage
   * @returns {Promise<Paypage>}
   */
  public initChargePaypage(paypage: Paypage): Promise<Paypage> {
    return InitPaypage(paypage, 'charge', this)
  }

  /**
   * Init authorize linkpay
   *
   * @param {Linkpay} linkpay
   * @returns {Promise<Linkpay>}
   */
  public initAuthorizeLinkpay(linkpay: Linkpay): Promise<Linkpay> {
    return InitLinkpay(linkpay, 'authorize', this)
  }

  /**
   * Init charge linkpay
   *
   * @param {Linkpay} linkpay
   * @returns {Promise<Linkpay>}
   */
  public initChargeLinkpay(linkpay: Linkpay): Promise<Linkpay> {
    return InitLinkpay(linkpay, 'charge', this)
  }

  /**
   * Update linkpay
   * 
   * @param {string} linkpayIdOrAlias
   * @param {updateLinkpayObject} linkpayObj
   * @returns {Promise<Linkpay>}
   */
  public updateLinkpay(linkpayIdOrAlias: string, linkpay: Linkpay): Promise<Linkpay> {
    return UpdateLinkpay(linkpayIdOrAlias, linkpay, this)
  }

  /**
   * Delete linkpay
   * 
   * @param {string} linkpayIdOrAlias
   * @returns {Promise<boolean>}
   */
  public deleteLinkpay(linkpayIdOrAlias: string): Promise<boolean> {
    return DeleteLinkpay(linkpayIdOrAlias, this)
  }

  /**
   * Init charge paypage
   *
   * @param {Paypage} paypage
   * @returns {Promise<Paypage>}
   */
  public payout(args: payoutObject): Promise<Payout> {
    return PayoutService(args, this)
  }

  /**
   * Fetch a payout object
   *
   * @param {string} paymentId
   * @param {string} payoutId
   * @returns {Promise<Payment>}
   */
  public fetchPayout(paymentId: string, payoutId: string): Promise<Payout> {
    return FetchPayout(paymentId, payoutId, this)
  }

  /**
   * Fetch hire purchase plans
   *
   * @param {string} amount
   * @param {string} currency
   * @param {string} effectiveInterestRate
   * @param {string} orderDate
   * @returns {Promise<Payment>}
   */
  public fetchHirePurchasePlan(amount: string, currency: string, effectiveInterestRate: string, orderDate: string): Promise<Array<HirePurchasePlan>> {
    return FetchHirePurchasePlan(amount, currency, effectiveInterestRate, orderDate, this)
  }

  /**
  * Update HirePurchase
  *
  * @param {string} hirePurchaseId
  * @param {updateHirePurchaseObject} hirePurchase
  * @returns {Promise<HirePurchase>}
  */
  public updateHirePurchase(hirePurchaseId: string, hirePurchase: updateHirePurchaseObject): Promise<HirePurchase> {
    return UpdateHirePurchase(hirePurchaseId, hirePurchase, this) 
  }

  /**
   * Start Recurring 
   * 
   * @param {string} paymentId 
   * @param {recurringObj} args
   */
  public startRecurring(paymentId: string, args: recurringObject): Promise<Recurring> {
    return CreateRecurring(paymentId, args, this)
  }

  /**
   * Register Webhook 
   * 
   * @param {webhookObject} args
   * @returns {Promise<Webhook>}
   */

  public registerWebhook(args: webhookObject): Promise<Webhook> {
    return RegisterWebhook(args, this)
  }

  /**
  * Fetch Webhook
  *
  * @param {string} id
  * @returns {Promise<Webhook>}
  */
  public fetchWebhook(id?: string): Promise<Webhook> {
    return FetchWebhook(this, id)
  }

  /**
  * Update Webhook
  *
  * @param {string} id
  * @returns {Promise<Webhook>}
  */
  public updateWebhook(id: string, args: any): Promise<Webhook> {
    return UpdateWebhook(id, args, this)
  }

  /**
  * Delete Webhook
  *
  * @param {string} id
  * @returns {Promise<Webhook>}
  */
  public deleteWebhook(id?: string): Promise<any> {
    return DeleteWebhook(this, id)
  }
}
