import Unzer from '../../Unzer'
import Authorization, { authorizeObject } from '../business/Authorization'
import Charge, { chargeObject } from '../business/Charge'

export default abstract class AbstractPaymentType {
  private _id: string
  private _unzer: Unzer
  private _geoLocation: any

  public abstract getTypeUrl(): string
  public abstract getPayload(): any

  /**
   * Set Unzer instance
   *
   * @param {Unzer} unzer
   */
  public setUnzer(unzer: Unzer) {
    this._unzer = unzer
  }

  /**
   * Get instance Unzer
   *
   * @returns {Unzer}
   */
  public getUnzer(): Unzer {
    return this._unzer
  }

  /**
   * Set Payment Id
   *
   * @param {string} paymentId
   */
  public setId(paymentId: string): void {
    this._id = paymentId
  }

  /**
   * Get Payment Id
   *
   * @returns {string}
   */
  public getId(): string {
    return this._id
  }

  /**
   * Authorize with payment card
   *
   * @param {authorizeObject} args
   * @returns {Promise<Authorization>}
   */
  public authorize(args: authorizeObject): Promise<Authorization> {
    return this.getUnzer().authorize(args)
  }

  /**
   * Charge on authorize
   *
   * @param {chargeAuthorizeObject} args
   * @returns {Promise<Charge>}
   */
  public charge(args: chargeObject): Promise<Charge> {
    return this.getUnzer().charge(args)
  }

  /**
   * Get geoLocation
   *
   * @returns {any}
   */
  public getGeoLocation(): any {
    return this._geoLocation
  }

  /**
   * Set geoLocation
   *
   * @param {any} geoLocation
   * @returns {any}
   */
  public setGeoLocation(geoLocation: any): any {
    this._geoLocation = geoLocation
  }
}
