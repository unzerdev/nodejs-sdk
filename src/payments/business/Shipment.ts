import AbstractPayment from "./AbstractPayment";
import Resources from "./Resources";
import Heidelpay from "../../Heidelpay";
import Processing from "./Processing";

export default class Shipment extends AbstractPayment {
  private amount: string
  private orderId: string
  private resources: Resources
  private processing: Processing

  constructor(heidelpay: Heidelpay) {
    super(heidelpay)
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