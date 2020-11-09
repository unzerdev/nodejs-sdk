import Unzer from '../../Unzer'
import AbstractPayment from './AbstractPayment'
import { Customer } from '../Customer'
import Charge from './Charge'
import Resources from './Resources'
import Cancel, { cancelAuthorizeObject } from './Cancel'
import PaymentType from '../types/PaymentType'
import Processing from './Processing';
import Basket from '../Basket'

export default class Authorization extends AbstractPayment {
  private amount: string
  private orderId: string
  private currency: string
  private returnUrl: string
  private paymentReference: string
  private zgReferenceId: string
  private resources: Resources
  private processing: Processing

  constructor(unzer: Unzer) {
    super(unzer)
    this.resources = new Resources()
    this.processing = new Processing()
  }

  /**
   * Get Amount
   *
   * @returns {string}
   */
  public getAmount(): string {
    return this.amount
  }

  /**
   * Set Amount
   *
   * @param {string} amount
   */
  public setAmount(amount: string) {
    this.amount = amount
  }

  /**
   * Get Order OId
   *
   * @returns {string}
   */
  public getOrderId(): string {
    return this.orderId
  }

  /**
   * Set Amount
   *
   * @param {string} amount
   */
  public setOrderId(orderId: string) {
    this.orderId = orderId
  }

  /**
   * Set currency
   *
   * @param {string} currency
   */
  public setCurrency(currency: string) {
    this.currency = currency
  }

  /**
   * Get currency
   *
   * @returns
   */
  public getCurrency() {
    return this.currency
  }

  /**
   * Set return url
   *
   * @param {string} returnUrl
   */
  public setReturnUrl(returnUrl: string) {
    this.returnUrl = returnUrl
  }

  /**
   * Get return url
   */
  public getReturnUrl() {
    return this.returnUrl
  }

  /**
   * Set Zg Payment Reference Id
   *
   * @param {string} zgReferenceId
   */
  public setZgReferenceId(zgReferenceId: string) {
    this.zgReferenceId = zgReferenceId
  }

  /**
   * Get Zg Reference Id
   *
   * @returns
   */
  public getZgReferenceId() {
    return this.zgReferenceId
  }

  /**
   * Set Payment Reference
   *
   * @param {string} paymentReference
   */
  public setPaymentReference(paymentReference: string) {
    this.paymentReference = paymentReference
  }

  /**
   * Get Payment Reference
   *
   * @returns
   */
  public getPaymentReference() {
    return this.paymentReference
  }

  /**
   * Get resources
   *
   * @returns {Resources}
   */
  public getResources(): Resources {
    return this.resources
  }

  /**
   * Set resources
   *
   * @param {*} resources
   */
  public setResources(resources: any) {
    this.resources
      .setCustomerId(resources.customerId)
      .setMetadataId(resources.metadataId)
      .setPaymentId(resources.paymentId)
      .setTypeId(resources.typeId)
      .setTraceId(resources.traceId)
  }

  /**
   * Get Processing
   *
   * @returns {Processing}
   */
  public getProcessing(): Processing {
    return this.processing
  }

  /**
   * Set Processing
   *
   * @param {*} processing
   */
  public setProcessing(processing: any) {
    this.processing
      .setUniqueId(processing.uniqueId)
      .setShortId(processing.shortId)
  }

  /**
   * Charge after authorize
   *
   * @param {number} [amount]
   * @returns {Promise<Charge>}
   */
  public charge(amount?: number): Promise<Charge> {
    const chargeAuthorizePayload: chargeAuthorizeObject = {
      paymentId: this.getResources().getPaymentId()
    }

    if (amount) {
      chargeAuthorizePayload.amount = amount
    }

    return this.getHeidelpay().chargeAuthorization(chargeAuthorizePayload)
  }

  /**
   * Reversal (Cancel of authorization)
   *
   * @param {number} [amount]
   * @returns {Promise<Cancel>}
   */
  public cancel(amount?: number): Promise<Cancel> {
    const cancelAuthorizePayload: cancelAuthorizeObject = {
      authorizationId: this.getId(),
      paymentId: this.getResources().getPaymentId()
    }

    if (amount) {
      cancelAuthorizePayload.amount = amount
    }

    return this.getHeidelpay().cancelAuthorization(cancelAuthorizePayload)
  }
}

export type authorizeObject = {
  amount: number
  orderId?: string
  currency: string
  typeId: string | PaymentType
  returnUrl: string
  paymentReference?: string
  customerId?: string | Customer
  metadataId?: string
  basketId?: string | Basket,
  effectiveInterestRate?: number
}

export type chargeAuthorizeObject = {
  paymentId: string
  paymentReference?: string
  amount?: number
}
