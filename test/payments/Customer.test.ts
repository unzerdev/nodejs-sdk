import { Customer, Salutation, Address } from '../../src/payments/Customer'
import Unzer from '../../src/Unzer'
import * as TestHelper from '../helpers/TestHelper'
import * as TestCustomerHelper from '../helpers/CustomerTestHelper'

describe('Customer test', () => {
  let unzer: Unzer
  const { createMiniumCustomer, createFullCustomer } = TestCustomerHelper

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

  it('Test create full customer', async () => {
    const fullCustomer = createFullCustomer()
    const customer: Customer = await unzer.createCustomer(fullCustomer)

    expect(customer).toBeInstanceOf(Customer)
    expect(customer.getCustomerId()).toBeDefined()
    expect(customer.getBillingAddress()).toEqual(fullCustomer.getBillingAddress())
    expect(customer.getShippingAddress()).toEqual(fullCustomer.getShippingAddress())
  })

  it('Test fetch minium customer', async () => {
    const customer: Customer = await unzer.createCustomer(createMiniumCustomer())
    const fetchCustomer: Customer = await unzer.fetchCustomer(customer.getCustomerId())

    expect(customer).toBeInstanceOf(Customer)
    expect(customer.getCustomerId()).toEqual(fetchCustomer.getCustomerId())
  })

  it('Test fetch full customer', async () => {
    const customer: Customer = await unzer.createCustomer(createFullCustomer())
    const fetchCustomer: Customer = await unzer.fetchCustomer(customer.getCustomerId())

    expect(customer).toBeInstanceOf(Customer)
    expect(customer.getCustomerId()).toEqual(fetchCustomer.getCustomerId())
    expect(customer.getBillingAddress()).toEqual(fetchCustomer.getBillingAddress())
    expect(customer.getShippingAddress()).toEqual(fetchCustomer.getShippingAddress())
  })

  it('Test update customer', async () => {
    const customer: Customer = await unzer.createCustomer(createFullCustomer())

    const updateDataCustomer = new Customer(customer.getFirstName(), customer.getLastName())
    updateDataCustomer.setFirstName("Max")

    const updatedCustomer = await unzer.updateCustomer(customer.getCustomerId(), updateDataCustomer)
    const fetchCustomer: Customer = await unzer.fetchCustomer(customer.getCustomerId())
    expect(updatedCustomer.getFirstName()).toEqual(fetchCustomer.getFirstName())
  })

  it('Test update salutation', async () => {
    const customer: Customer = await unzer.createCustomer(createFullCustomer())

    const updateDataCustomer = new Customer(customer.getFirstName(), customer.getLastName())
    updateDataCustomer.setSalutation(Salutation.mrs)

    await unzer.updateCustomer(customer.getCustomerId(), updateDataCustomer)
    const fetchCustomer: Customer = await unzer.fetchCustomer(customer.getCustomerId())
    expect(fetchCustomer.getSalutation()).toEqual('mrs')
  })

  it('Test delete customer', async () => {
    const customer: Customer = await unzer.createCustomer(createFullCustomer())
    const deleteCustomer = await unzer.deleteCustomer(customer.getCustomerId())

    expect(deleteCustomer).toBeTruthy()
  })
})
