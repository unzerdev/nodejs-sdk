import * as apiURL from '../../configs/ApiUrls'
import AbstractPaymentType from './AbstractPaymentType'
import PaymentType from './PaymentType'

export default class InstallmentSecuredPlan extends AbstractPaymentType implements PaymentType {
  private _numberOfRates: number
  private _dayOfPurchase: string
  private _orderDate: string
  private _totalPurchaseAmount: number
  private _totalInterestAmount: number
  private _totalAmount: number
  private _effectiveInterestRate: number
  private _nominalInterestRate: number
  private _feeFirstRate: number
  private _feePerRate: number
  private _monthlyRate: number
  private _lastRate: number

  constructor() {
    super()
  }

  /**
   * Set Number of Rate
   *
   * @param {string} numberOfRates
   * @returns {InstallmentSecuredPlan}
   */
  public setNumberOfRates(numberOfRates: number): InstallmentSecuredPlan {
    this._numberOfRates = numberOfRates
    return this
  }

  /**
   * Get Number of Rate
   *
   * @returns {string}
   */
  public getNumberOfRates(): number {
    return this._numberOfRates
  }

  /**
   * Set Day of purchase
   *
   * @param {string} dayOfPurchase
   * @returns {InstallmentSecuredPlan}
   */
  public setDayOfPurchase(dayOfPurchase: string): InstallmentSecuredPlan {
    this._dayOfPurchase = dayOfPurchase
    return this
  }

  /**
   * Get Day of Purchase
   *
   * @returns {string}
   */
  public getDayOfPurchase(): string {
    return this._dayOfPurchase
  }

  /**
   * Set Order Date
   *
   * @param {string} orderDate
   * @returns {InstallmentSecuredPlan}
   */
  public setOrderDate(orderDate: string): InstallmentSecuredPlan {
    this._orderDate = orderDate
    return this
  }

  /**
   * Get Order Date
   *
   * @returns {string}
   */
  public getOrderDate(): string {
    return this._orderDate
  }

  /**
   * Set Total Purchase Amount
   *
   * @param {number} totalPurchaseAmount
   * @returns {InstallmentSecuredPlan}
   */
  public setTotalPurchaseAmount(totalPurchaseAmount: number): InstallmentSecuredPlan {
    this._totalPurchaseAmount = totalPurchaseAmount
    return this
  }

  /**
   * Get Total Purchase Amount
   *
   * @returns {number}
   */
  public getTotalPurchaseAmount(): number {
    return this._totalPurchaseAmount
  }

  /**
   * Set Interest Amount
   *
   * @param {number} totalInterestAmount
   * @returns {InstallmentSecuredPlan}
   */
  public setTotalInterestAmount(totalInterestAmount: number): InstallmentSecuredPlan {
    this._totalInterestAmount = totalInterestAmount
    return this
  }

  /**
   * Get Interest Amount
   *
   * @returns {number}
   */
  public getTotalInterestAmount(): number {
    return this._totalInterestAmount
  }

  /**
   * Set Total Amount
   *
   * @param {number} totalAmount
   * @returns {InstallmentSecuredPlan}
   */
  public setTotalAmount(totalAmount: number): InstallmentSecuredPlan {
    this._totalAmount = totalAmount
    return this
  }

  /**
   * Get Total Amount
   *
   * @returns {number}
   */
  public getTotalAmount(): number {
    return this._totalAmount
  }

  /**
   * Set Effective Interest Rate
   *
   * @param {number} effectiveInterestRate
   * @returns {InstallmentSecuredPlan}
   */
  public setEffectiveInterestRate(effectiveInterestRate: number): InstallmentSecuredPlan {
    this._effectiveInterestRate = effectiveInterestRate
    return this
  }

  /**
   * Get Total Amount
   *
   * @returns {number}
   */
  public getEffectiveInterestRate(): number {
    return this._effectiveInterestRate
  }

  /**
   * Set Nominal Interest Rate
   *
   * @param {number} nominalInterestRate
   * @returns {InstallmentSecuredPlan}
   */
  public setNominalInterestRate(nominalInterestRate: number): InstallmentSecuredPlan {
    this._nominalInterestRate = nominalInterestRate
    return this
  }

  /**
   * Get Nominal Interest Rate
   *
   * @returns {number}
   */
  public getNominalInterestRate(): number {
    return this._nominalInterestRate
  }

  /**
   * Set Fee First Rate
   *
   * @param {number} feeFirstRate
   * @returns {InstallmentSecuredPlan}
   */
  public setFeeFirstRate(feeFirstRate: number): InstallmentSecuredPlan {
    this._feeFirstRate = feeFirstRate
    return this
  }

  /**
   * Get Nominal Interest Rate
   *
   * @returns {number}
   */
  public getFeeFirstRate(): number {
    return this._feeFirstRate
  }

  /**
   * Set Fee Per Rate
   *
   * @param {number} feePerRate
   * @returns {InstallmentSecuredPlan}
   */
  public setFeePerRate(feePerRate: number): InstallmentSecuredPlan {
    this._feePerRate = feePerRate
    return this
  }

  /**
   * Get Nominal Interest Rate
   *
   * @returns {number}
   */
  public getFeePerRate(): number {
    return this._feePerRate
  }

  /**
   * Set Monthly Rate
   *
   * @param {number} monthlyRate
   * @returns {InstallmentSecuredPlan}
   */
  public setMonthlyRate(monthlyRate: number): InstallmentSecuredPlan {
    this._monthlyRate = monthlyRate
    return this
  }

  /**
   * Get Monthly Rate
   *
   * @returns {number}
   */
  public getMonthlyRate(): number {
    return this._monthlyRate
  }

  /**
   * Set Last Rate
   *
   * @param {number} lastRate
   * @returns {InstallmentSecuredPlan}
   */
  public setLastRate(lastRate: number): InstallmentSecuredPlan {
    this._lastRate = lastRate
    return this
  }

  /**
   * Get Monthly Rate
   *
   * @returns {number}
   */
  public getLastRate(): number {
    return this._lastRate
  }
  
  /**
   * Get url end point
   *
   * @returns {string}
   */
  public getTypeUrl(): string {
    return apiURL.URL_TYPE_INSTALLMENT_SECURED_PLANS
  }

  /**
   * Get Payload
   *
   * @returns {*}
   */
  public getPayload(): any {
    return {}
  }
}
