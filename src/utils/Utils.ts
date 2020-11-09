import Card from '../payments/types/Card'
import AbstractPaymentType from '../payments/types/AbstractPaymentType'
import EPS from '../payments/types/Eps'
import Giropay from '../payments/types/Giropay'
import Paypal from '../payments/types/Paypal'
import Ideal from '../payments/types/Ideal'
import Invoice from '../payments/types/Invoice'
import Prepayment from '../payments/types/Prepayment'
import Przelewy24 from '../payments/types/Przelewy24'
import SepaDirectDebit from '../payments/types/SepaDirectDebit'
import SepaDirectDebitSecured from '../payments/types/SepaDirectDebitSecured'
import Sofort from '../payments/types/Sofort'
import PIS from '../payments/types/Pis'
import Alipay from '../payments/types/Alipay'
import WechatPay from '../payments/types/WechatPay'
import Bancontact from '../payments/types/Bancontact'
import HirePurchase from '../payments/types/HirePurchase'
import InvoiceSecured from '../payments/types/InvoiceSecured'

/**
 * Replace URL with parameters: {paymentId} => s-pay-1781
 *
 * @param {string} url
 * @param {*} args
 * @returns
 */
export const replaceUrl = (url: string, args: any) => {
  const regex = /{([a-zA-Z]+)}/gm

  const urlReplaced = url.replace(regex, (matches, item) => {
    return args[item] || ''
  })

  return urlReplaced
}

/**
 * Get refund id from url
 *
 * Ex:
 * <domain>payments/s-pay-3883/charges/s-chg-1/cancels/s-cnl-1
 * It should return s-chg-1 as refund Id of this cancel
 *
 * @param {string} url
 * @returns
 */
export const getRefundIdOfCancel = (url: string) => {
  const regex = /\/([a-zA-Z-0-9]+)\/cancels/gm
  const matches = regex.exec(url)

  return matches ? matches[1] : ''
}

/**
 * Get payment type from typeId
 * Ex:
 * crd => Card()
 * gro => GrioPay()
 * @param {string} typeId
 * @returns {AbstractPaymentType}
 */
export const getPaymentTypeFromTypeId = (typeId: string): AbstractPaymentType => {
  if (typeId.length < 5) {
    throw new Error(`Type ${typeId} is currently not supported by the SDK`)
  }

  const paymentType = typeId.substring(2, 5)
  switch (paymentType) {
    case 'crd':
      return new Card()
    case 'eps':
      return new EPS()
    case 'gro':
      return new Giropay()
    case 'ppl':
      return new Paypal()
    case 'idl':
      return new Ideal()
    case 'ivc':
      return new Invoice()
    case 'ivs':
      return new InvoiceSecured()
    case 'ppy':
      return new Prepayment()
    case 'p24':
      return new Przelewy24()
    case 'sdd':
      return new SepaDirectDebit("")
    case 'dds':
      return new SepaDirectDebitSecured("")
    case 'sft':
      return new Sofort()
    case 'pis':
      return new PIS()
    case 'ali':
      return new Alipay()
    case 'wcp':
      return new WechatPay()
    case 'bct':
      return new Bancontact()
    case 'hdd':
      return new HirePurchase()
    default:
      throw new Error(`Type ${typeId} is currently not supported by the SDK`)
  }
}

/**
 * Map response with propery payment Type
 *
 * @param {*} response
 * @returns {AbstractPaymentType}
 */
export const mapResponsePaymentType = (response: any): AbstractPaymentType => {
  switch (response.method) {
    case 'card':
      const card: Card = new Card()
        .setNumber(response.number)
        .setExpiryDate(response.expiryDate)
        .setCVC(response.cvc)
        .setBrand(response.brand)
        .setRecurring(response.recurring)

      if (response.cardHolder) {
        card.setCardHolder(response.cardHolder)
      }

      if (response.cardDetails) {
        card.setCardDetails(response.cardDetails)
      }

      card.setId(response.id)
      card.setGeoLocation(response.geoLocation)
      return card

    case 'EPS':
      const eps: EPS = new EPS().setBic(response.bic)

      eps.setId(response.id)
      eps.setGeoLocation(response.geoLocation)
      return eps
      
    case 'giropay':
      const giropay: Giropay = new Giropay()

      giropay.setId(response.id)
      giropay.setGeoLocation(response.geoLocation)
      return giropay
    
    case 'paypal':
      const paypal: Paypal = new Paypal()

      paypal.setId(response.id)
      paypal.setGeoLocation(response.geoLocation)
      return paypal

    case 'ideal':
      const ideal: Ideal = new Ideal().setBic(response.bic)

      ideal.setId(response.id)
      ideal.setGeoLocation(response.geoLocation)
      return ideal

    case 'invoice':
      const invoice: Invoice = new Invoice()

      invoice.setId(response.id)
      invoice.setGeoLocation(response.geoLocation)
      return invoice

    case 'invoice-secured':
      const invoiceSecured: InvoiceSecured = new InvoiceSecured()

      invoiceSecured.setId(response.id)
      invoiceSecured.setGeoLocation(response.geoLocation)
      return invoiceSecured

    case 'przelewy24':
      const przelewy24: Przelewy24 = new Przelewy24()

      przelewy24.setId(response.id)
      przelewy24.setGeoLocation(response.geoLocation)
      return przelewy24

    case 'prepayment':
      const prepayment: Prepayment = new Prepayment()

      prepayment.setId(response.id)
      prepayment.setGeoLocation(response.geoLocation)
      return prepayment

    case 'sepa-direct-debit':
      const sepaDirectDebit: SepaDirectDebit = new SepaDirectDebit(response.iban)
        .setBic(response.bic)
        .setHolder(response.holder)

      sepaDirectDebit.setId(response.id)
      sepaDirectDebit.setGeoLocation(response.geoLocation)
      return sepaDirectDebit

    case 'sepa-direct-debit-secured':
      const dds: SepaDirectDebitSecured = new SepaDirectDebitSecured(response.iban)
        .setBic(response.bic)
        .setHolder(response.holder)

        dds.setId(response.id)
        dds.setGeoLocation(response.geoLocation)
        return dds

    case 'sofort':
      const sofort: Sofort = new Sofort()

      sofort.setId(response.id)
      sofort.setGeoLocation(response.geoLocation)
      return sofort

    case 'PIS':
      const pis: PIS = new PIS()

      pis.setId(response.id)
      pis.setGeoLocation(response.geoLocation)
      return pis

    case 'alipay':
      const alipay: Alipay = new Alipay()

      alipay.setId(response.id)
      alipay.setGeoLocation(response.geoLocation)
      return alipay

    case 'wechatpay':
      const wechatpay: WechatPay = new WechatPay()

      wechatpay.setId(response.id)
      wechatpay.setGeoLocation(response.geoLocation)
      return wechatpay

    case 'bancontact':
      const bancontact: Bancontact = new Bancontact()

      if (response.holder) {
        bancontact.setHolder(response.holder)
      }

      bancontact.setId(response.id)
      bancontact.setGeoLocation(response.geoLocation)
      return bancontact

    case 'hire-purchase-direct-debit':
      const hirePurchase: HirePurchase = new HirePurchase()

      hirePurchase
        .setIban(response.iban)
        .setBic(response.bic)
        .setAccountHolder(response.accountHolder)
        .setOrderDate(response.orderDate)
        .setNumberOfRates(response.numberOfRates)
        .setDayOfPurchase(response.dayOfPurchase)
        .setTotalPurchaseAmount(response.totalPurchaseAmount)
        .setTotalInterestAmount(response.totalInterestAmount)
        .setEffectiveInterestRate(response.effectiveInterestRate)
        .setNominalInterestRate(response.nominalInterestRate)
        .setFeeFirstRate(response.feeFirstRate)
        .setFeePerRate(response.feePerRate)
        .setMonthlyRate(response.monthlyRate)
        .setLastRate(response.lastRate)
        .setInvoiceDate(response.invoiceDate)
        .setInvoiceDueDate(response.invoiceDueDate)

      hirePurchase.setId(response.id)
      hirePurchase.setGeoLocation(response.geoLocation)
      return hirePurchase

    default:
      throw new Error(`Type ${response.method} is currently not supported by the SDK`)
  }
}
