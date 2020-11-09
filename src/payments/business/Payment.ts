import AbstractPayment from './AbstractPayment'
import Unzer from '../../Unzer'
import Resources from './Resources'
import Authorization from './Authorization'
import Charge from './Charge'
import Cancel from './Cancel'

export default class Payment extends AbstractPayment {
  private resources: Resources
  private authorization: Authorization
  private chargeList: Array<Charge>
  private cancelList: Array<Cancel>

  constructor(unzer: Unzer) {
    super(unzer)
    this.resources = new Resources()
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
   * Set authorize transaction
   *
   * @param {Authorization} authorization
   */
  public setAuthorization(authorization: Authorization) {
    this.authorization = authorization
  }

  /**
   * Get authorize transaction
   *
   * @returns {Authorization}
   */
  public getAuthorization(): Authorization {
    return this.authorization
  }

  /**
   * Set list charge transactions
   *
   * @param {Array<Charge>} chargeList
   */
  public setChargeList(chargeList: Array<Charge>) {
    this.chargeList = chargeList
  }

  /**
   * Get list charge transactions
   *
   * @returns {Array<Charge>}
   */
  public getChargeList(): Array<Charge> {
    return this.chargeList
  }

  /**
   * Get charge transaction
   *
   * @param {string} chargeId
   * @returns {Charge}
   */
  public getCharge(chargeId: string): Charge {
    const chargeItem = this.getChargeList().find(
      (item: Charge) => item.getId() === chargeId
    ) as Charge

    if (chargeItem && chargeItem.getId()) {
      return chargeItem
    }

    throw new Error(`Charge Id is not found in list of transaction`)
  }

  /**
   * Set list cancel transactions
   *
   * @param {Array<Cancel>} chargeList
   */
  public setCancelList(cancelList: Array<Cancel>) {
    this.cancelList = cancelList
  }

  /**
   * Get list cancel transactions
   *
   * @returns {Array<Cancel>}
   */
  public getCancelList(): Array<Cancel> {
    return this.cancelList
  }

  /**
   * Get cancel transaction
   *
   * @param {string} cancelId
   * @returns {Cancel}
   */
  public getCancel(cancelId: string, refundId?: string): Cancel {
    let cancelItem

    if (refundId) {
      // Find item in list of cancel with cancel Id and refund Id
      cancelItem = this.getCancelList().find((item: Cancel) => item.getId() === cancelId && item.getRefundId() === refundId)
    } else {
      // Find item in list of cancel with only cancel Id
      cancelItem = this.getCancelList().find((item: Cancel) => item.getId() === cancelId)
    }

    if (cancelItem && cancelItem.getId()) {
      return cancelItem
    }

    throw new Error(`Cancel Id is not found in list of transaction`)
  }
}
