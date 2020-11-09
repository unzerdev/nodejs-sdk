import AbstractPayment from "./AbstractPayment";
import Resources from "./Resources";
import Unzer from "../../Unzer";
import Processing from "./Processing";

export default class Shipment extends AbstractPayment {
  private amount: string
  private orderId: string
  private invoiceId: string
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

export type shipmentObject = {
  orderId?: string,
  invoiceId?: string,
}