import Unzer from '../../../src/Unzer'
import * as TestHelper from '../../helpers/TestHelper'
import * as TestCustomerHelper from '../../helpers/CustomerTestHelper'
import HirePurchasePlan from '../../../src/payments/types/HirePurchasePlan'
import { Basket } from '../../../src'
import InstallmentSecured from '../../../src/payments/types/InstallmentSecured'
import Authorization from '../../../src/payments/business/Authorization'
import Charge from '../../../src/payments/business/Charge'
import { Customer } from '../../../src/payments/Customer'
import Cancel from '../../../src/payments/business/Cancel'


describe('InstallmentSecured test', () => {
  let unzer: Unzer

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createHeidelpayInstance()
  })

  const { 
    getAuthorizationWithInterest, getChargeAuthorization, 
    getCancelChargeHirePurchase, getUpdateHirePurchase, createBasketWithAmountVat
  } = TestHelper
  const { createFullCustomer } = TestCustomerHelper

  it('Test Hire Purchase Plan', async () => {
    const HirePurchasePlanList: Array<HirePurchasePlan> = await unzer.fetchHirePurchasePlan('100', 'EUR', '5.99', '2019-03-21')

    expect(HirePurchasePlanList).toBeDefined()
    expect(HirePurchasePlanList.length).toEqual(6)
  })

  it('Test Create Hire Purchase Payment Type', async () => {
    const HirePurchasePlanList: Array<HirePurchasePlan> = await unzer.fetchHirePurchasePlan('100', 'EUR', '5.99', '2019-03-21')
    let installmentSecured: InstallmentSecured = new InstallmentSecured()
    let HirePurchasePlan: HirePurchasePlan = HirePurchasePlanList[0]

    installmentSecured.setNumberOfRates(HirePurchasePlan.getNumberOfRates())
    .setDayOfPurchase(HirePurchasePlan.getDayOfPurchase())
    .setOrderDate(HirePurchasePlan.getOrderDate())
    .setTotalPurchaseAmount(HirePurchasePlan.getTotalPurchaseAmount())
    .setTotalInterestAmount(HirePurchasePlan.getTotalInterestAmount())
    .setTotalAmount(HirePurchasePlan.getTotalAmount())
    .setEffectiveInterestRate(HirePurchasePlan.getEffectiveInterestRate())
    .setNominalInterestRate(HirePurchasePlan.getNominalInterestRate())
    .setFeeFirstRate(HirePurchasePlan.getFeeFirstRate())
    .setFeePerRate(HirePurchasePlan.getFeePerRate())
    .setMonthlyRate(HirePurchasePlan.getMonthlyRate())
    .setLastRate(HirePurchasePlan.getLastRate())

    installmentSecured.setIban("DE46940594210000012345")
    .setBic("COBADEFFXXX")
    .setAccountHolder("Rene Felder")
    .setInvoiceDate('2019-08-10')
    .setInvoiceDueDate('2020-08-30')
    
    installmentSecured = await unzer.createPaymentType(installmentSecured) as InstallmentSecured
    expect(installmentSecured.getId()).toBeDefined()
  })

  it('should return amount equal to grossAmount when calling cancelCharge and passing gross, net and vat amounts', async () => {
    const HirePurchasePlanList: Array<HirePurchasePlan> = await unzer.fetchHirePurchasePlan('100', 'EUR', '5.99', '2019-03-21')
    let installmentSecured: InstallmentSecured = new InstallmentSecured()
    let HirePurchasePlan: HirePurchasePlan = HirePurchasePlanList[0]

    installmentSecured.setNumberOfRates(HirePurchasePlan.getNumberOfRates())
      .setDayOfPurchase(HirePurchasePlan.getDayOfPurchase())
      .setOrderDate(HirePurchasePlan.getOrderDate())
      .setTotalPurchaseAmount(HirePurchasePlan.getTotalPurchaseAmount())
      .setTotalInterestAmount(HirePurchasePlan.getTotalInterestAmount())
      .setTotalAmount(HirePurchasePlan.getTotalAmount())
      .setEffectiveInterestRate(HirePurchasePlan.getEffectiveInterestRate())
      .setNominalInterestRate(HirePurchasePlan.getNominalInterestRate())
      .setFeeFirstRate(HirePurchasePlan.getFeeFirstRate())
      .setFeePerRate(HirePurchasePlan.getFeePerRate())
      .setMonthlyRate(HirePurchasePlan.getMonthlyRate())
      .setLastRate(HirePurchasePlan.getLastRate())

    installmentSecured.setIban("DE46940594210000012345")
      .setBic("COBADEFFXXX")
      .setAccountHolder("Rene Felder")
      .setInvoiceDate('2019-08-10')
      .setInvoiceDueDate('2020-08-30')

    const customer: Customer = await unzer.createCustomer(createFullCustomer())
    const customerId: string = customer.getCustomerId()
    const basket: Basket = await unzer.createBasket(createBasketWithAmountVat())
    const basketId: string = basket.getId()

    const InstallmentSecuredPaymentType = await unzer.createPaymentType(installmentSecured) as InstallmentSecured
    const InstallmentSecuredPaymentId: string = InstallmentSecuredPaymentType.getId()
    const auth: Authorization = await unzer.authorize(getAuthorizationWithInterest(InstallmentSecuredPaymentId, customerId, basketId))
    const authPaymentId = auth.getResources().getPaymentId()
    const charge: Charge = await unzer.chargeAuthorization(getChargeAuthorization(authPaymentId))
    const chargePaymentId: string = charge.getResources().getPaymentId()
    const chargeId: string = charge.getId()
    const amountGross: string = '100.0000'
    const amountNet: string = '90.00'
    const amountVat: string = '10.00'
    const cancelCharge: Cancel = await unzer.cancelCharge(getCancelChargeHirePurchase(chargePaymentId, chargeId, amountGross, amountNet, amountVat))
    const cancelAmount: string = cancelCharge.getAmount()

    expect(cancelAmount).toEqual(amountGross)
  })

  it('should allow to update InstallmentSecured after creating InstallmentSecured payment type', async () => {
    const HirePurchasePlanList: Array<HirePurchasePlan> = await unzer.fetchHirePurchasePlan('100', 'EUR', '5.99', '2019-03-21')
    const installmentSecured: InstallmentSecured = new InstallmentSecured()
    const HirePurchasePlan: HirePurchasePlan = HirePurchasePlanList[0]

    installmentSecured.setNumberOfRates(HirePurchasePlan.getNumberOfRates())
      .setDayOfPurchase(HirePurchasePlan.getDayOfPurchase())
      .setOrderDate(HirePurchasePlan.getOrderDate())
      .setTotalPurchaseAmount(HirePurchasePlan.getTotalPurchaseAmount())
      .setTotalInterestAmount(HirePurchasePlan.getTotalInterestAmount())
      .setTotalAmount(HirePurchasePlan.getTotalAmount())
      .setEffectiveInterestRate(HirePurchasePlan.getEffectiveInterestRate())
      .setNominalInterestRate(HirePurchasePlan.getNominalInterestRate())
      .setFeeFirstRate(HirePurchasePlan.getFeeFirstRate())
      .setFeePerRate(HirePurchasePlan.getFeePerRate())
      .setMonthlyRate(HirePurchasePlan.getMonthlyRate())
      .setLastRate(HirePurchasePlan.getLastRate())

    installmentSecured.setIban("DE46940594210000012345")
      .setBic("COBADEFFXXX")
      .setAccountHolder("Rene Felder")
      .setInvoiceDate('2019-08-10')
      .setInvoiceDueDate('2020-08-30')

    const InstallmentSecuredOriginal = await unzer.createPaymentType(installmentSecured) as InstallmentSecured
    const InstallmentSecuredPaymentId: string = InstallmentSecuredOriginal.getId()
    const InstallmentSecuredUpdated = await unzer.updateHirePurchase(InstallmentSecuredPaymentId, getUpdateHirePurchase('Michael Jordan', '2020-12-12')) 
    
    expect(InstallmentSecuredOriginal.getAccountHolder()).not.toBe(InstallmentSecuredUpdated.getAccountHolder())
    expect(InstallmentSecuredOriginal.getAccountHolder()).toBe('Rene Felder')
    expect(InstallmentSecuredUpdated.getAccountHolder()).toBe('Michael Jordan')

    expect(InstallmentSecuredOriginal.getInvoiceDueDate()).not.toEqual(InstallmentSecuredUpdated.getInvoiceDueDate())
    expect(InstallmentSecuredOriginal.getInvoiceDueDate()).toBe('2020-08-30')
    expect(InstallmentSecuredUpdated.getInvoiceDueDate()).toBe('2020-12-12')

    expect(InstallmentSecuredOriginal.getInvoiceDate()).not.toEqual(InstallmentSecuredUpdated.getInvoiceDate())
    expect(InstallmentSecuredOriginal.getIban()).not.toEqual(InstallmentSecuredUpdated.getIban())
    expect(InstallmentSecuredOriginal.getBic()).not.toEqual(InstallmentSecuredUpdated.getBic())
  })

  it('Test fetch InstallmentSecured', async () => {
    const HirePurchasePlanList: Array<HirePurchasePlan> = await unzer.fetchHirePurchasePlan('100', 'EUR', '5.99', '2019-03-21')
    let installmentSecured: InstallmentSecured = new InstallmentSecured()
    let HirePurchasePlan: HirePurchasePlan = HirePurchasePlanList[0]

    installmentSecured.setNumberOfRates(HirePurchasePlan.getNumberOfRates())
      .setDayOfPurchase(HirePurchasePlan.getDayOfPurchase())
      .setOrderDate(HirePurchasePlan.getOrderDate())
      .setTotalPurchaseAmount(HirePurchasePlan.getTotalPurchaseAmount())
      .setTotalInterestAmount(HirePurchasePlan.getTotalInterestAmount())
      .setTotalAmount(HirePurchasePlan.getTotalAmount())
      .setEffectiveInterestRate(HirePurchasePlan.getEffectiveInterestRate())
      .setNominalInterestRate(HirePurchasePlan.getNominalInterestRate())
      .setFeeFirstRate(HirePurchasePlan.getFeeFirstRate())
      .setFeePerRate(HirePurchasePlan.getFeePerRate())
      .setMonthlyRate(HirePurchasePlan.getMonthlyRate())
      .setLastRate(HirePurchasePlan.getLastRate())

    installmentSecured.setIban("DE46940594210000012345")
      .setBic("COBADEFFXXX")
      .setAccountHolder("Rene Felder")
      .setInvoiceDate('2019-08-10')
      .setInvoiceDueDate('2020-08-30')

    installmentSecured = await unzer.createPaymentType(installmentSecured) as InstallmentSecured
    const fetchHirePurchase = await unzer.fetchPaymentType(installmentSecured.getId()) as InstallmentSecured

    expect(installmentSecured.getId()).toEqual(fetchHirePurchase.getId())
  })

  it('Test geolocation', async () => {
    const HirePurchasePlanList: Array<HirePurchasePlan> = await unzer.fetchHirePurchasePlan('100', 'EUR', '5.99', '2019-03-21')
    let installmentSecured: InstallmentSecured = new InstallmentSecured()
    let HirePurchasePlan: HirePurchasePlan = HirePurchasePlanList[0]

    installmentSecured.setNumberOfRates(HirePurchasePlan.getNumberOfRates())
      .setDayOfPurchase(HirePurchasePlan.getDayOfPurchase())
      .setOrderDate(HirePurchasePlan.getOrderDate())
      .setTotalPurchaseAmount(HirePurchasePlan.getTotalPurchaseAmount())
      .setTotalInterestAmount(HirePurchasePlan.getTotalInterestAmount())
      .setTotalAmount(HirePurchasePlan.getTotalAmount())
      .setEffectiveInterestRate(HirePurchasePlan.getEffectiveInterestRate())
      .setNominalInterestRate(HirePurchasePlan.getNominalInterestRate())
      .setFeeFirstRate(HirePurchasePlan.getFeeFirstRate())
      .setFeePerRate(HirePurchasePlan.getFeePerRate())
      .setMonthlyRate(HirePurchasePlan.getMonthlyRate())
      .setLastRate(HirePurchasePlan.getLastRate())

    installmentSecured.setIban("DE46940594210000012345")
      .setBic("COBADEFFXXX")
      .setAccountHolder("Rene Felder")
      .setInvoiceDate('2019-08-10')
      .setInvoiceDueDate('2020-08-30')

    installmentSecured = await unzer.createPaymentType(installmentSecured) as InstallmentSecured
    const fetchInstallmentSecured = await unzer.fetchPaymentType(installmentSecured.getId()) as InstallmentSecured

    expect(installmentSecured.getGeoLocation()).toBeDefined()
    expect(fetchInstallmentSecured.getGeoLocation()).toBeDefined()
  })
})