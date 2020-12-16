import * as apiURL from '../configs/ApiUrls'
import Payment from '../payments/business/Payment'
import PaymentService from './PaymentService'
import Authorization from '../payments/business/Authorization'
import { getRefundIdOfCancel } from '../utils/Utils'
import FetchCancel from './FetchCancel'
import Charge from '../payments/business/Charge'
import Cancel from '../payments/business/Cancel'
import FetchCharge from './FetchCharge'
import FetchAuthorization from './FetchAuthorization';
import ResponseErrorsMapper from './mappers/ResponseErrorsMapper';

export default (paymentId: string, paymentService: PaymentService): Promise<Payment> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Call api end point to get response
      const response: any = await paymentService
        .getRequestAdapter()
        .get(`${apiURL.URL_PAYMENT}/${paymentId}`, paymentService.getUnzer().getPrivateKey())

      // Handle errors response
      if (response.errors) {
        return reject(ResponseErrorsMapper(response))
      }

      // New Payment with Hedeipay instance
      let payment = new Payment(paymentService.getUnzer())

      // Set payment Id
      payment.setId(response.id)

      // Set resources
      payment.setResources(response.resources)

      // Fetch authorization transaction and set to payment object
      const authorizeItem = await _fetchAuthorization(response.transactions, paymentService)
      if(authorizeItem) {
        payment.setAuthorization(authorizeItem)
      }

      // Fetch cancel list transaction and set to payment object
      payment.setCancelList(await _fetchCancelList(payment, response.transactions, paymentService))

      // Fetch charge list transaction and set to payment object
      payment.setChargeList(await _fetchChargeList(payment, response.transactions, paymentService))

      // Set Payload
      payment.setPayload(response)

      // Resolve final result
      resolve(payment)
    } catch (error) {
      // Reject with error object
      reject(error)
    }
  })
}

const _fetchAuthorization = (
  transactions: any,
  paymentService: PaymentService
): Promise<Authorization | null> => {
  return new Promise(async (resolve, reject) => {
    // Find transaction authorize in list of transactions
    const authorizeItem = transactions.find((item: any) => item.type === 'authorize')

    if (typeof authorizeItem === 'undefined') {
      resolve(null)
      return // No authorize Item found
    } else {
      // Call Authorization service to fetch transaction
      const authorization: Authorization = await FetchAuthorization(
        authorizeItem.url,
        paymentService
      )

      // Resolve final result
      resolve(authorization)
    }
  })
}

const _fetchChargeList = (
  payment: Payment,
  transactions: any,
  paymentService: PaymentService,
): Promise<Array<Charge>> => {
  return new Promise(async resolve => {
    // Find charge list in list of transactions
    const chargeListItem = transactions.filter((item: any) => item.type === 'charge')
    const chargeList: Array<Charge> = []
    const cancelList: Array<Cancel> = payment.getCancelList()

    const promiseCharge = chargeListItem.map(async (item: any) => {
      // Call Charge service to fetch transaction
      const charge: Charge = await FetchCharge(item.url, paymentService)

      // Set payment object in cancel
      charge.setPayment(payment)

      // Set cancel list for charge object
      charge.setCancelList(cancelList.filter((itemCancel: any) => itemCancel.getRefundId() === charge.getId()))

      // Push charge instance to chargeList array
      chargeList.push(charge)
    })

    // Await util charge service fetch done
    await Promise.all(promiseCharge)

    // Resolve final result
    resolve(chargeList)
  })
}

const _fetchCancelList = (
  payment: Payment,
  transactions: any,
  paymentService: PaymentService
): Promise<Array<Cancel>> => {
  return new Promise(async resolve => {
    // Find charge list in list of transactions
    const cancelListItem = transactions.filter(
      (item: any) => item.type === 'cancel' || item.type === 'cancel-charge' || item.type === 'cancel-authorize'
    )
    const cancelList: Array<Cancel> = []

    const promiseCancel = cancelListItem.map(async (item: any) => {
      // Call Cancel service to fetch transaction
      const cancel: Cancel = await FetchCancel(item.url, paymentService)

      // Set payment object in cancel
      cancel.setPayment(payment)

      // Set refund Id of cancel
      cancel.setRefundId(getRefundIdOfCancel(item.url))

      // Push charge instance to cancelList array
      cancelList.push(cancel)
    })

    // Await util charge service fetch done
    await Promise.all(promiseCancel)

    // Resolve final result
    resolve(cancelList)
  })
}
