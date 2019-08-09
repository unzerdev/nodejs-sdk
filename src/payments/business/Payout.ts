import Heidelpay from '../../Heidelpay'
import AbstractPayment from './AbstractPayment'
import { Customer } from '../Customer'
import Resources from './Resources'
import PaymentType from '../types/PaymentType'
import Processing from './Processing'

export default class Payout extends AbstractPayment {
  private amount: string
  private orderId: string
  private currency: string
  private returnUrl: string
  private paymentReference: string
  private resources: Resources
  private processing: Processing

  constructor(heidelpay: Heidelpay) {
    super(heidelpay)
    this.resources = new Resources()
    this.processing = new Processing()
  }
  /**
   * Set amount
   *
   * @param {string} amount
   */
  public setAmount(amount: string) {
    this.amount = amount
  }

  /**
   * Get amount
   *
   * @returns {string}
   */
  public getAmount(): string {
    return this.amount
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
}

export type payoutObject = {
  amount: number
  orderId?: string
  currency: string
  returnUrl: string
  typeId: string | PaymentType
  paymentReference?: string
  customerId?: string | Customer
  metadataId?: string
}
