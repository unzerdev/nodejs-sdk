import { Customer, Salutation, Address } from '../../src/payments/Customer'
import Unzer from '../../src/Unzer'
import * as TestHelper from '../helpers/TestHelper'
import * as TestCustomerHelper from '../helpers/CustomerTestHelper'

describe('Customer test', () => {
  let unzer: Unzer
  const { 
    createMiniumCustomer, 
    createFullCustomerWithComapanyInfoRegister,
    createFullCustomerWithComapanyInfoNotRegister
  } = TestCustomerHelper

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createHeidelpayInstance()
  })

  it('Test create minium customer', async () => {
    const customer: Customer = await unzer.createCustomer(createMiniumCustomer())

    expect(customer).toBeInstanceOf(Customer)
    expect(customer.getFirstName()).toEqual(createMiniumCustomer().getFirstName())
    expect(customer.getLastName()).toEqual(createMiniumCustomer().getLastName())
  })

  it('Test create full customer with company register', async () => {
    const fullCustomer = createFullCustomerWithComapanyInfoRegister()
    const customer: Customer = await unzer.createCustomer(fullCustomer)

    expect(customer).toBeInstanceOf(Customer)
    expect(customer.getCustomerId()).toBeDefined()
    expect(customer.getBillingAddress()).toEqual(fullCustomer.getBillingAddress())
    expect(customer.getShippingAddress()).toEqual(fullCustomer.getShippingAddress())
    expect(customer.getCompanyInfo()).toEqual(fullCustomer.getCompanyInfo())
  })

  it('Test create full customer with company not register', async () => {
    const fullCustomer = createFullCustomerWithComapanyInfoNotRegister()
    const customer: Customer = await unzer.createCustomer(fullCustomer)

    expect(customer).toBeInstanceOf(Customer)
    expect(customer.getCustomerId()).toBeDefined()
    expect(customer.getBillingAddress()).toEqual(fullCustomer.getBillingAddress())
    expect(customer.getShippingAddress()).toEqual(fullCustomer.getShippingAddress())
    expect(customer.getCompanyInfo()).toEqual(fullCustomer.getCompanyInfo())
  })

  it('Test fetch full customer with company register', async () => {
    const fullCustomer = createFullCustomerWithComapanyInfoRegister()
    const customer: Customer = await unzer.createCustomer(fullCustomer)
    const fetchCustomer = await unzer.fetchCustomer(customer.getCustomerId())

    expect(fetchCustomer).toBeInstanceOf(Customer)
    expect(fetchCustomer.getCustomerId()).toBeDefined()
    expect(fetchCustomer.getBillingAddress()).toEqual(fullCustomer.getBillingAddress())
    expect(fetchCustomer.getShippingAddress()).toEqual(fullCustomer.getShippingAddress())
    expect(fetchCustomer.getCompanyInfo().commercialRegisterNumber).toEqual(fullCustomer.getCompanyInfo().commercialRegisterNumber)
    expect(fetchCustomer.getCompanyInfo().registrationType).toEqual(fullCustomer.getCompanyInfo().registrationType)
  })

  it('Test update customer', async () => {
    const fullCustomer = createFullCustomerWithComapanyInfoRegister()
    const customer: Customer = await unzer.createCustomer(fullCustomer)

    const updateDataCustomer = new Customer(customer.getFirstName(), customer.getLastName())
    updateDataCustomer.setFirstName("Max")
    updateDataCustomer.setCompany("CompanyX")

    const updatedCustomer = await unzer.updateCustomer(customer.getCustomerId(), updateDataCustomer)
    const fetchCustomer: Customer = await unzer.fetchCustomer(customer.getCustomerId())
    expect(updatedCustomer.getFirstName()).toEqual(fetchCustomer.getFirstName())
    expect(updatedCustomer.getCompany()).toEqual(fetchCustomer.getCompany())
  })

  it('Test delete customer', async () => {
    const fullCustomer = createFullCustomerWithComapanyInfoRegister()
    const customer: Customer = await unzer.createCustomer(fullCustomer)
    const deleteCustomer = await unzer.deleteCustomer(customer.getCustomerId())

    expect(deleteCustomer).toBeTruthy()
  })
})
