import AbstractPayment from './AbstractPayment'
import Unzer from '../../Unzer'
import Resources from './Resources'
import Processing from './Processing';

export default class Cancel extends AbstractPayment {
  private amount: string
  private orderId: string
  private refundId: string
  private paymentReference: string
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
   * Get refund Id
   *
   * @returns {string}
   */
  public getRefundId(): string {
    return this.refundId
  }

  /**
   * Set refund Id
   *
   * @param {string} refund Id
   */
  public setRefundId(refundId: string) {
    this.refundId = refundId
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
}

export type cancelAuthorizeObject = {
  paymentId: string
  paymentReference?: string
  authorizationId: string
  amount?: number
}

export type cancelChargeObject = {
  paymentId: string
  paymentReference?: string
  chargeId: string
  amount?: number,
  amountGross?: string,
  amountNet?: string,
  amountVat?: string
}
