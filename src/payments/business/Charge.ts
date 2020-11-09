import Unzer from '../../Unzer'
import AbstractPayment from './AbstractPayment'
import { Customer } from '../Customer'
import Resources from './Resources'
import PaymentType from '../types/PaymentType'
import Cancel, { cancelChargeObject } from './Cancel'
import Processing from './Processing'

export default class Charge extends AbstractPayment {
  private amount: string
  private orderId: string
  private currency: string
  private returnUrl: string
  private paymentReference: string
  private card3ds: boolean
  private resources: Resources
  private cancelList: Array<Cancel>
  private processing: Processing
  private invoiceId: string

  constructor(unzer: Unzer) {
    super(unzer)
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
   * Get Order Id
   *
   * @returns {string}
   */
  public getOrderId(): string {
    return this.orderId
  }

  /**
   * Set Order Id
   *
   * @param {string} orderId
   */
  public setOrderId(orderId: string) {
    this.orderId = orderId
  }

  /**
   * Get Invoice Id
   *
   * @returns {string}
   */
  public getInvoiceId(): string {
    return this.invoiceId
  }

  /**
   * Set Invoice Id
   *
   * @param {string} invoiceId
   */
  public setInvoiceId(invoiceId: string) {
    this.invoiceId = invoiceId
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
   * Set 3ds option
   *
   * @param {string} returnUrl
   */
  public setCard3ds(card3ds: boolean) {
    this.card3ds = card3ds
  }

  /**
   * Get 3ds option
   */
  public getCard3ds() {
    return this.card3ds
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
      .setBasketId(resources.basketId)
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
   * Get cancel transaction
   *
   * @param {string} cancelId
   * @returns {Cancel}
   */
  public getCancel(cancelId: string): Cancel {
    const cancelItem = this.getCancelList().find((item: Cancel) => item.getId() === cancelId) as Cancel

    if (cancelItem && cancelItem.getId()) {
      return cancelItem
    }

    throw new Error(`Cancel Id is not found in list of transaction`)
  }

  /**
   * Get list of cancel transactions
   *
   * @returns {Array<Cancel>}
   */
  public getCancelList(): Array<Cancel> {
    return this.cancelList
  }

  /**
   * Set list of cancel transactions
   *
   * @param {Array<Cancel>} cancelList
   */
  public setCancelList(cancelList: Array<Cancel>) {
    this.cancelList = cancelList
  }

  /**
   * Refund (Cancel of charge)
   *
   * @param {number} [amount]
   * @returns {Promise<Cancel>}
   */
  public cancel(amount?: number): Promise<Cancel> {
    const cancelChargePayload: cancelChargeObject = {
      chargeId: this.getId(),
      paymentId: this.getResources().getPaymentId()
    }

    if (amount) {
      cancelChargePayload.amount = amount
    }

    return this.getUnzer().cancelCharge(cancelChargePayload)
  }
}

export type chargeObject = {
  amount: number
  orderId?: string
  invoiceId?: string
  currency: string
  returnUrl: string
  paymentReference?: string
  card3ds?: boolean
  typeId: string | PaymentType
  customerId?: string | Customer
  metadataId?: string
  basketId?: string
}
