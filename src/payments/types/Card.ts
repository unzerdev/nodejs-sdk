import * as apiURL from '../../configs/ApiUrls'
import AbstractPaymentType from './AbstractPaymentType'
import PaymentType from './PaymentType'

export default class Card extends AbstractPaymentType implements PaymentType {
  private _recurring: boolean
  private _brand: string
  private _number: string
  private _cvc: string
  private _expiryDate: string
  private _cardHolder: string
  private _email: string
  private _3ds: boolean
  private _cardDetails: any

  constructor(number: string = '', expiryDate: string = '') {
    super()
    this._number = number
    this._expiryDate = expiryDate
    this._cardHolder = ''
    this._cardDetails = {}
  }

  /**
   * Get url end point
   *
   * @returns {string}
   */
  public getTypeUrl(): string {
    return apiURL.URL_TYPE_CARD
  }

  /**
   * Get Payload
   *
   * @returns
   */
  public getPayload() {
    const payload: any = {
      number: this.getNumber(),
      cvc: this.getCVC(),
      expiryDate: this.getExpiryDate()
    }

    if(this.get3ds() !== undefined) {
      payload['3ds'] = this.get3ds()
    }

    if(this.getEmail() !== undefined) {
      payload['email'] = this.getEmail()
    }

    return payload
  }

  /**
   * Set pan number
   *
   * @param {string} number
   * @returns {Card}
   */
  public setNumber(number: string): Card {
    this._number = number
    return this
  }

  /**
   * Get pan number
   *
   * @returns {string}
   */
  public getNumber(): string {
    return this._number
  }

  /**
   * Set CVC number
   *
   * @param {string} cvc
   * @returns {Card}
   */
  public setCVC(cvc: string): Card {
    this._cvc = cvc
    return this
  }

  /**
   * Get CVC
   *
   * @returns {string}
   */
  public getCVC(): string {
    return this._cvc
  }

  /**
   * Set expiry date
   *
   * @param {string} expiryDate
   * @returns {Card}
   */
  public setExpiryDate(expiryDate: string): Card {
    this._expiryDate = expiryDate
    return this
  }

  /**
   * Get expirty Date
   *
   * @returns {string}
   */
  public getExpiryDate(): string {
    return this._expiryDate
  }

  /**
   * Set card holder
   *
   * @param {string} cardHolder
   * @returns {Card}
   */
  public setCardHolder(cardHolder: string): Card {
    this._cardHolder = cardHolder
    return this
  }

  /**
   * Get card holder
   *
   * @returns {string}
   */
  public getCardHolder(): string {
    return this._cardHolder
  }

  /**
   * Set email
   *
   * @param {string} email
   * @returns {Card}
   */
  public setEmail(email: string): Card {
    this._email = email
    return this
  }

  /**
   * Get email
   *
   * @returns {string}
   */
  public getEmail(): string {
    return this._email
  }

  /**
   * Set brand name
   *
   * @param {string} brand
   * @returns {Card}
   */
  public setBrand(brand: string): Card {
    this._brand = brand
    return this
  }

  /**
   * Get brand name
   *
   * @returns {string}
   */
  public getBrand(): string {
    return this._brand
  }

  /**
   * Set recurring option
   *
   * @param {string} recurring
   * @returns {Card}
   */
  public setRecurring(recurring: boolean): Card {
    this._recurring = recurring
    return this
  }

  /**
   * Get recurring option
   *
   * @returns {string}
   */
  public getRecurring(): boolean {
    return this._recurring
  }

  /**
   * Set card detail
   *
   * @param {object} cardDetail
   * @returns {Card}
   */
  public setCardDetails(cardDetails: any): Card {
    this._cardDetails = cardDetails
    return this
  }

  /**
   * Get card detail
   *
   * @returns {object}
   */
  public getCardDetails(): any {
    return this._cardDetails
  }

  /**
   * Set 3ds option
   *
   * @param {string} expiryDate
   * @returns {Card}
   */
  public set3ds(secure: boolean): Card {
    this._3ds = secure
    return this
  }

  /**
   * Get 3ds option
   *
   * @returns {string}
   */
  public get3ds(): boolean {
    return this._3ds
  }
}
