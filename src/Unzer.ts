import { SDK_VERSION } from './configs/Version'
import { Customer } from './payments/Customer'
import PaymentService from './services/PaymentService'
import Metadata from './payments/Metadata'
import Basket from './payments/Basket'
import PaymentType from './payments/types/PaymentType'
import * as ErrorMessage from './configs/ErrorMessage'
import Authorization, { authorizeObject, chargeAuthorizeObject } from './payments/business/Authorization'
import Payout, { payoutObject } from './payments/business/Payout'
import Charge, { chargeObject } from './payments/business/Charge'
import Cancel, { cancelAuthorizeObject, cancelChargeObject } from './payments/business/Cancel'
import Paypage from './payments/paypage/Paypage'
import Linkpay from './payments/paypage/Linkpay'
import Payment from './payments/business/Payment'
import AbstractPaymentType from './payments/types/AbstractPaymentType'
import Shipment, { shipmentObject } from './payments/business/Shipment'
import Recurring, { recurringObject } from './payments/business/Recurring'
import HirePurchasePlan from './payments/types/HirePurchasePlan'
import HirePurchase, { updateHirePurchaseObject } from './payments/types/HirePurchase'
import Webhook, { webhookObject } from './payments/business/Webhook'

export default class Unzer {
  private paymentService: PaymentService
  private privateKey: string

  constructor(privateKey: string, locale?: string, env?: string) {
    if (!privateKey) {
      throw new Error(ErrorMessage.ERROR_MISSING_PRIVATE_KEY)
    }

    this.privateKey = privateKey
    this.paymentService = new PaymentService(this, locale, env)
  }

  /**
   * Get SDK Version
   *
   * @returns {string}
   */
  public getVersion(): string {
      return SDK_VERSION
  }

  /**
   * Get private key
   *
   * @returns {string}
   */
  public getPrivateKey(): string {
    return this.privateKey
  }

  /**
   * Create a payment
   *
   * @param {PaymentType} paymentType
   * @returns {PaymentType}
   */
  public createPaymentType(paymentType: AbstractPaymentType): Promise<PaymentType> {
    return this.paymentService.createPaymentType(paymentType)
  }

  /**
   * Create new customer
   *
   * @param {Customer} customer
   * @returns {Customer}
   */
  public createCustomer(customer: Customer): Promise<Customer> {
    return this.paymentService.createCustomer(customer)
  }

  /**
   * Fetch a customer
   *
   * @param {string} customerId
   * @returns {Promise}
   */
  public fetchCustomer(customerId: string): Promise<Customer> {
    return this.paymentService.fetchCustomer(customerId)
  }

  /**
   * Update customer
   *
   * @param {string} customerId
   * @param {Customer} customer
   * @returns {Promise<Customer>}
   */
  public updateCustomer(customerId: string, customer: Customer): Promise<Customer> {
    return this.paymentService.updateCustomer(customerId, customer)
  }

  /**
   * Delete a customer
   *
   * @param {string} customerId
   * @returns {Promise<boolean>}
   */
  public deleteCustomer(customerId: string): Promise<boolean> {
    return this.paymentService.deleteCustomer(customerId)
  }

  /**
   * Create metadata
   * 
   * @param {Metadata} metadata 
   */
  public createMetadata(metadata: Metadata): Promise<Metadata> {
    return this.paymentService.createMetadata(metadata)
  }

  /**
   * Fetch metadata information
   * 
   * @param metadataId 
   */
  public fetchMetadata(metadataId: string): Promise<Metadata> {
    return this.paymentService.fetchMetadata(metadataId)
  }

  /**
   * Create a basket
   *
   * @param {Basket} basket
   * @returns {Basket}
   */
  public createBasket(basket: Basket): Promise<Basket> {
    return this.paymentService.createBasket(basket)
  }

  /**
   * Fetch a basket
   *
   * @param {Basket} basket
   * @returns {Basket}
   */
  public fetchBasket(basketId: string): Promise<Basket> {
    return this.paymentService.fetchBasket(basketId)
  }

  /**
   * Update basket
   *
   * @param {Basket} basket
   * @returns {Basket}
   */
  public updateBasket(basketId: string, basket: Basket): Promise<Basket> {
    return this.paymentService.updateBasket(basketId, basket)
  }

  /**
   * Fetch a payment
   *
   * @param {string} orderId
   * @returns {Promise}
   */
  public fetchPaymentType(paymentTypeId: string): Promise<PaymentType> {
    return this.paymentService.fetchPaymentType(paymentTypeId)
  }

  /**
   * Fetch a payment
   *
   * @param {string} orderId
   * @returns {Promise}
   */
  public fetchPayment(paymentId: string): Promise<Payment> {
    return this.paymentService.fetchPayment(paymentId)
  }

  /**
   * Fetch authorization transaction
   *
   * @param {string} paymentId
   * @returns {Promise<Authorization>}
   */
  public fetchAuthorization(paymentId: string): Promise<Authorization> {
    return new Promise(async (resolve, reject) => {
      try {
        const payment = await this.paymentService.fetchPayment(paymentId)
        resolve(payment.getAuthorization())
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Fetch charge transaction
   *
   * @param {string} paymentId
   * @param {string} chargeId
   * @returns {Promise<Charge>}
   */
  public fetchCharge(paymentId: string, chargeId: string): Promise<Charge> {
    return new Promise(async (resolve, reject) => {
      try {
        const payment = await this.paymentService.fetchPayment(paymentId)
        resolve(payment.getCharge(chargeId))
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Fetch cancel transaction
   *
   * @param {string} paymentId
   * @param {string} refundId
   * @param {string} cancelId
   * @returns {Promise<Cancel>}
   */
  public fetchCancel(paymentId: string, cancelId: string, refundId?: string): Promise<Cancel> {
    return new Promise(async (resolve, reject) => {
      try {
        // Fetch a payment with payment Id
        const payment = await this.paymentService.fetchPayment(paymentId)
        
        if(refundId) {
          // Get cancel from payment with cancel Id and refund Id
          resolve(payment.getCancel(cancelId, refundId))  
        } else {
          // Get cancel from payment with only cancel Id
          resolve(payment.getCancel(cancelId))  
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Unzer Authorize
   *
   * @param {authorizeObject} args
   * @returns {Authorization}
   */
  public async authorize(args: authorizeObject): Promise<Authorization> {
    let { typeId, customerId } = args

    // If typeId is a instance of PaymentType (not string)
    // we will create a payment first then authorize with paymentTypeId
    if (typeId instanceof AbstractPaymentType) {
      const paymentType: PaymentType = await this.createPaymentType(typeId)
      typeId = paymentType.getId()
    }

    // If customerId is a instance of Customer (not string)
    // we will create a payment first then authorize with paymentTypeId
    if (customerId instanceof Customer) {
      const customer: Customer = await this.createCustomer(customerId)
      customerId = customer.getCustomerId()
    }

    return this.paymentService.authorize({ ...args, typeId: typeId, customerId: customerId })
  }

  /**
   * Unzer Charge
   *
   * @param {chargeObject} args
   * @returns {Promise<Charge>}
   */
  public async charge(args: chargeObject): Promise<Charge> {
    let { typeId, customerId } = args

    // If typeId is a instance of PaymentType (not string)
    // we will create a payment first then authorize with paymentTypeId
    if (typeId instanceof AbstractPaymentType) {
      const paymentType: PaymentType = await this.createPaymentType(typeId)
      typeId = paymentType.getId()
    }

    // If customerId is a instance of Customer (not string)
    // we will create a payment first then authorize with paymentTypeId
    if (customerId instanceof Customer) {
      const customer: Customer = await this.createCustomer(customerId)
      customerId = customer.getCustomerId()
    }

    return this.paymentService.charge({ ...args, typeId: typeId, customerId: customerId })
  }

  /**
   * Unzer Charge after authorization
   *
   * @param {chargeAuthorizeObject} args
   * @returns {Promise<Charge>}
   */
  public chargeAuthorization(args: chargeAuthorizeObject): Promise<Charge> {
    return this.paymentService.chargeAuthorization(args)
  }

  /**
   * Reversal (Cancel of authorize)
   *
   * @param {cancelAuthorizeObject} args
   * @returns {Promise<Cancel>}
   */
  public cancelAuthorization(args: cancelAuthorizeObject): Promise<Cancel> {
    return this.paymentService.cancelAuthorization(args)
  }

  /**
   * Cancel charge
   *
   * @param {cancelChargeObject} args
   * @returns {Promise<Cancel>}
   */
  public cancelCharge(args: cancelChargeObject): Promise<Cancel> {
    return this.paymentService.cancelCharge(args)
  }

  /**
   * Shipment 
   * 
   * @param paymentId 
   */
  public shipment(paymentId: string, args: shipmentObject): Promise<Shipment> {
    return this.paymentService.shipment(paymentId, args)
  }

  /**
   * Start recurring 
   * 
   * @param {string} paymentId 
   * @param {recurringObj} args
   */
  public startRecurring(paymentId: string, args: recurringObject): Promise<Recurring> {
    return this.paymentService.startRecurring(paymentId, args)
  }

  /**
   * Init Paypage with authorize
   *
   * @param {Paypage} paypage
   * @returns {Promise<Paypage>}
   */
  public initAuthorizePaypage(paypage: Paypage): Promise<Paypage> {
    return this.paymentService.initAuthorizePaypage(paypage)
  }

  /**
   * Init Paypage with charge
   *
   * @param {Paypage} paypage
   * @returns {Promise<Paypage>}
   */
  public initChargePaypage(paypage: Paypage): Promise<Paypage> {
    return this.paymentService.initChargePaypage(paypage)
  }

  /**
   * Init Linkpay with authorize
   *
   * @param {Linkpay} linkpay
   * @returns {Promise<Linkpay>}
   */
  public initAuthorizeLinkpay(linkpay: Linkpay): Promise<Linkpay> {
    return this.paymentService.initAuthorizeLinkpay(linkpay)
  }

  /**
   * Init Linkpay with charge
   *
   * @param {Linkpay} linkpay
   * @returns {Promise<Linkpay>}
   */
  public initChargeLinkpay(linkpay: Linkpay): Promise<Linkpay> {
    return this.paymentService.initChargeLinkpay(linkpay)
  }

  /**
   * Update Linkpay
   *
   * @param {string} linkpayIdOrAlias
   * @param {Linkpay} linkpay
   * @returns {Promise<Linkpay>}
   */
  public updateLinkpay(linkpayIdOrAlias: string, linkpay: Linkpay): Promise<Linkpay> {
    return this.paymentService.updateLinkpay(linkpayIdOrAlias, linkpay)
  }

  /**
   * Delete Linkpay
   *
   * @param {string} linkpayIdOrAlias
   * @returns {Promise<boolean>}
   */
  public deleteLinkpay(linkpayIdOrAlias: string): Promise<boolean> {
    return this.paymentService.deleteLinkpay(linkpayIdOrAlias)
  }

  /**
   * Unzer Payout
   *
   * @param {payoutObject} args
   * @returns {Payout}
   */
  public payout(args: payoutObject): Promise<Payout> {
    return this.paymentService.payout(args)
  }

  /**
   * Fetch payout transaction
   *
   * @param {string} paymentId
   * @param {string} payoutId
   * @returns {Promise<Payout>}
   */
  public fetchPayout(paymentId: string, payoutId: string): Promise<Payout> {
    return this.paymentService.fetchPayout(paymentId, payoutId)
  }

  /**
   * Fetch hire purchase plans
   *
   * @param {string} amount
   * @param {string} currency
   * @param {string} effectiveInterestRate
   * @param {string} orderDate
   * @returns {Promise<Payout>}
   */
  public fetchHirePurchasePlan(amount: string, currency: string, effectiveInterestRate: string, orderDate: string): Promise<Array<HirePurchasePlan>> {
    return this.paymentService.fetchHirePurchasePlan(amount, currency, effectiveInterestRate, orderDate)
  }

  public updateHirePurchase(hirePurchaseId: string, hirePurchase: updateHirePurchaseObject): Promise<HirePurchase> {
    return this.paymentService.updateHirePurchase(hirePurchaseId, hirePurchase)
  }

  /**
  * Register Webhook
  *
  * @param {webhookObject} args
  * @returns {Promise<Webhook>}
  */
 public registerWebhook(args: webhookObject): Promise<Webhook> {
   return this.paymentService.registerWebhook(args)
 }

  /**
  * Fetch Webhook
  *
  * @param {string} id
  * @returns {Promise<Webhook>}
  */
  public fetchWebhook(id?: string): Promise<Webhook> {
    return this.paymentService.fetchWebhook(id)
  }

  /**
  * Update Webhook
  *
  * @param {any} args
  * @param {string} id
  * @returns {Promise<Webhook>}
  */
  public updateWebhook(id: string, args: any): Promise<Webhook> {
    return this.paymentService.updateWebhook(id, args)
  }

  /**
  * Delete Webhook
  *
  * @param {string} id
  * @returns {Promise<Webhook>}
  */
  public deleteWebhook(id?: string): Promise<any> {
    return this.paymentService.deleteWebhook(id)
  }
}
