import Unzer from '../../../src/Unzer'
import * as TestHelper from '../../helpers/TestHelper'
import * as TestCustomerHelper from '../../helpers/CustomerTestHelper'
import InstallmentSecuredPlan from '../../../src/payments/types/InstallmentSecuredPlan'
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
    unzer = TestHelper.createUnzerInstance()
  })

  const { 
    getAuthorizationWithInterest, getChargeAuthorization, 
    getCancelChargeHirePurchase, getUpdateInstallmentSecured, createBasketWithAmountVat
  } = TestHelper
  const { createFullCustomer } = TestCustomerHelper

  it('Test Installment Secured Plan', async () => {
    const InstallmentSecuredPlanList: Array<InstallmentSecuredPlan> = await unzer.fetchInstallmentSecuredPlan('100', 'EUR', '5.99', '2019-03-21')

    expect(InstallmentSecuredPlanList).toBeDefined()
    expect(InstallmentSecuredPlanList.length).toEqual(6)
  })

  it('Test Create Installment Secured Payment Type', async () => {
    const InstallmentSecuredPlanList: Array<InstallmentSecuredPlan> = await unzer.fetchInstallmentSecuredPlan('100', 'EUR', '5.99', '2020-12-10')
    let installmentSecured: InstallmentSecured = new InstallmentSecured()
    let InstallmentSecuredPlan: InstallmentSecuredPlan = InstallmentSecuredPlanList[0]

    installmentSecured.setNumberOfRates(InstallmentSecuredPlan.getNumberOfRates())
    .setDayOfPurchase(InstallmentSecuredPlan.getDayOfPurchase())
    .setOrderDate(InstallmentSecuredPlan.getOrderDate())
    .setTotalPurchaseAmount(InstallmentSecuredPlan.getTotalPurchaseAmount())
    .setTotalInterestAmount(InstallmentSecuredPlan.getTotalInterestAmount())
    .setTotalAmount(InstallmentSecuredPlan.getTotalAmount())
    .setEffectiveInterestRate(InstallmentSecuredPlan.getEffectiveInterestRate())
    .setNominalInterestRate(InstallmentSecuredPlan.getNominalInterestRate())
    .setFeeFirstRate(InstallmentSecuredPlan.getFeeFirstRate())
    .setFeePerRate(InstallmentSecuredPlan.getFeePerRate())
    .setMonthlyRate(InstallmentSecuredPlan.getMonthlyRate())
    .setLastRate(InstallmentSecuredPlan.getLastRate())

    installmentSecured.setIban("DE46940594210000012345")
    .setBic("COBADEFFXXX")
    .setAccountHolder("Rene Felder")
    .setInvoiceDate('2020-12-10')
    .setInvoiceDueDate('2021-08-30')
    
    installmentSecured = await unzer.createPaymentType(installmentSecured) as InstallmentSecured
    expect(installmentSecured.getId()).toBeDefined()
  })

  it('should return amount equal to grossAmount when calling cancelCharge and passing gross, net and vat amounts', async () => {
    const InstallmentSecuredPlanList: Array<InstallmentSecuredPlan> = await unzer.fetchInstallmentSecuredPlan('100', 'EUR', '5.99', '2019-03-21')
    let installmentSecured: InstallmentSecured = new InstallmentSecured()
    let InstallmentSecuredPlan: InstallmentSecuredPlan = InstallmentSecuredPlanList[0]

    installmentSecured.setNumberOfRates(InstallmentSecuredPlan.getNumberOfRates())
      .setDayOfPurchase(InstallmentSecuredPlan.getDayOfPurchase())
      .setOrderDate(InstallmentSecuredPlan.getOrderDate())
      .setTotalPurchaseAmount(InstallmentSecuredPlan.getTotalPurchaseAmount())
      .setTotalInterestAmount(InstallmentSecuredPlan.getTotalInterestAmount())
      .setTotalAmount(InstallmentSecuredPlan.getTotalAmount())
      .setEffectiveInterestRate(InstallmentSecuredPlan.getEffectiveInterestRate())
      .setNominalInterestRate(InstallmentSecuredPlan.getNominalInterestRate())
      .setFeeFirstRate(InstallmentSecuredPlan.getFeeFirstRate())
      .setFeePerRate(InstallmentSecuredPlan.getFeePerRate())
      .setMonthlyRate(InstallmentSecuredPlan.getMonthlyRate())
      .setLastRate(InstallmentSecuredPlan.getLastRate())

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
    const InstallmentSecuredPlanList: Array<InstallmentSecuredPlan> = await unzer.fetchInstallmentSecuredPlan('100', 'EUR', '5.99', '2019-03-21')
    const installmentSecured: InstallmentSecured = new InstallmentSecured()
    const InstallmentSecuredPlan: InstallmentSecuredPlan = InstallmentSecuredPlanList[0]

    installmentSecured.setNumberOfRates(InstallmentSecuredPlan.getNumberOfRates())
      .setDayOfPurchase(InstallmentSecuredPlan.getDayOfPurchase())
      .setOrderDate(InstallmentSecuredPlan.getOrderDate())
      .setTotalPurchaseAmount(InstallmentSecuredPlan.getTotalPurchaseAmount())
      .setTotalInterestAmount(InstallmentSecuredPlan.getTotalInterestAmount())
      .setTotalAmount(InstallmentSecuredPlan.getTotalAmount())
      .setEffectiveInterestRate(InstallmentSecuredPlan.getEffectiveInterestRate())
      .setNominalInterestRate(InstallmentSecuredPlan.getNominalInterestRate())
      .setFeeFirstRate(InstallmentSecuredPlan.getFeeFirstRate())
      .setFeePerRate(InstallmentSecuredPlan.getFeePerRate())
      .setMonthlyRate(InstallmentSecuredPlan.getMonthlyRate())
      .setLastRate(InstallmentSecuredPlan.getLastRate())

    installmentSecured.setIban("DE46940594210000012345")
      .setBic("COBADEFFXXX")
      .setAccountHolder("Rene Felder")
      .setInvoiceDate('2019-08-10')
      .setInvoiceDueDate('2020-08-30')

    const installmentSecuredOriginal = await unzer.createPaymentType(installmentSecured) as InstallmentSecured
    const installmentSecuredPaymentId: string = installmentSecuredOriginal.getId()
    const installmentSecuredUpdated = await unzer.updateInstallmentSecured(installmentSecuredPaymentId, getUpdateInstallmentSecured('Michael Jordan', '2020-12-12')) 
    
    expect(installmentSecuredOriginal.getAccountHolder()).not.toBe(installmentSecuredUpdated.getAccountHolder())
    expect(installmentSecuredOriginal.getAccountHolder()).toBe('Rene Felder')
    expect(installmentSecuredUpdated.getAccountHolder()).toBe('Michael Jordan')

    expect(installmentSecuredOriginal.getInvoiceDueDate()).not.toEqual(installmentSecuredUpdated.getInvoiceDueDate())
    expect(installmentSecuredOriginal.getInvoiceDueDate()).toBe('2020-08-30')
    expect(installmentSecuredUpdated.getInvoiceDueDate()).toBe('2020-12-12')

    expect(installmentSecuredOriginal.getInvoiceDate()).not.toEqual(installmentSecuredUpdated.getInvoiceDate())
    expect(installmentSecuredOriginal.getIban()).not.toEqual(installmentSecuredUpdated.getIban())
    expect(installmentSecuredOriginal.getBic()).not.toEqual(installmentSecuredUpdated.getBic())
  })

  it('Test fetch InstallmentSecured', async () => {
    const InstallmentSecuredPlanList: Array<InstallmentSecuredPlan> = await unzer.fetchInstallmentSecuredPlan('100', 'EUR', '5.99', '2019-03-21')
    let installmentSecured: InstallmentSecured = new InstallmentSecured()
    let InstallmentSecuredPlan: InstallmentSecuredPlan = InstallmentSecuredPlanList[0]

    installmentSecured.setNumberOfRates(InstallmentSecuredPlan.getNumberOfRates())
      .setDayOfPurchase(InstallmentSecuredPlan.getDayOfPurchase())
      .setOrderDate(InstallmentSecuredPlan.getOrderDate())
      .setTotalPurchaseAmount(InstallmentSecuredPlan.getTotalPurchaseAmount())
      .setTotalInterestAmount(InstallmentSecuredPlan.getTotalInterestAmount())
      .setTotalAmount(InstallmentSecuredPlan.getTotalAmount())
      .setEffectiveInterestRate(InstallmentSecuredPlan.getEffectiveInterestRate())
      .setNominalInterestRate(InstallmentSecuredPlan.getNominalInterestRate())
      .setFeeFirstRate(InstallmentSecuredPlan.getFeeFirstRate())
      .setFeePerRate(InstallmentSecuredPlan.getFeePerRate())
      .setMonthlyRate(InstallmentSecuredPlan.getMonthlyRate())
      .setLastRate(InstallmentSecuredPlan.getLastRate())

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
    const InstallmentSecuredPlanList: Array<InstallmentSecuredPlan> = await unzer.fetchInstallmentSecuredPlan('100', 'EUR', '5.99', '2019-03-21')
    let installmentSecured: InstallmentSecured = new InstallmentSecured()
    let InstallmentSecuredPlan: InstallmentSecuredPlan = InstallmentSecuredPlanList[0]

    installmentSecured.setNumberOfRates(InstallmentSecuredPlan.getNumberOfRates())
      .setDayOfPurchase(InstallmentSecuredPlan.getDayOfPurchase())
      .setOrderDate(InstallmentSecuredPlan.getOrderDate())
      .setTotalPurchaseAmount(InstallmentSecuredPlan.getTotalPurchaseAmount())
      .setTotalInterestAmount(InstallmentSecuredPlan.getTotalInterestAmount())
      .setTotalAmount(InstallmentSecuredPlan.getTotalAmount())
      .setEffectiveInterestRate(InstallmentSecuredPlan.getEffectiveInterestRate())
      .setNominalInterestRate(InstallmentSecuredPlan.getNominalInterestRate())
      .setFeeFirstRate(InstallmentSecuredPlan.getFeeFirstRate())
      .setFeePerRate(InstallmentSecuredPlan.getFeePerRate())
      .setMonthlyRate(InstallmentSecuredPlan.getMonthlyRate())
      .setLastRate(InstallmentSecuredPlan.getLastRate())

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