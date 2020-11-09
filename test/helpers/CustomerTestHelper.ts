import { Customer, Address, Salutation, CompanyInfo } from '../../src/payments/Customer'

export const createMiniumCustomer = () => {
  return new Customer('Rene', 'Felder')
}

export const createFullCustomer = () => {
  const billingAddress: Address = {
    name: 'Peter Universum',
    street: 'Hugo-Junkers-Str. 5',
    state: 'DE-BO',
    zip: '60386',
    city: 'Frankfurt am Main',
    country: 'DE'
  }

  const shippingAddress: Address = {
    name: 'Peter Universum',
    street: 'Hugo-Junkers-Str. 5',
    state: 'DE-BO',
    zip: '60386',
    city: 'Frankfurt am Main',
    country: 'DE'
  }

  let customer: Customer = new Customer()
    .setFirstName('Max')
    .setLastName('Mustermann')
    .setSalutation(Salutation.mr)
    .setBirthDate('1972-12-24')
    .setEmail('max.mustermann@unzer.com')
    .setPhone('+49 6221 64 71 101')
    .setMobile('+49 172 123 457')
    .setBillingAddress(billingAddress)
    .setShippingAddress(shippingAddress)

  return customer
}

export const createCustomer = (unzer) => async (builder: boolean = false) => {
  const billingAddress: Address = {
    name: 'Peter Universum',
    street: 'Hugo-Junkers-Str. 5',
    state: 'DE-BO',
    zip: '60386',
    city: 'Frankfurt am Main',
    country: 'DE'
  }

  let customer: Customer = new Customer()
    .setFirstName('Max')
    .setLastName('Mustermann')
    .setSalutation(Salutation.mr)
    .setBirthDate('1972-12-24')
    .setEmail('max.mustermann@unzer.com')
    .setPhone('+49 6221 64 71 101')
    .setMobile('+49 172 123 457')
    .setBillingAddress(billingAddress)

  if (builder === true) {
    return customer
  }

  customer = await unzer.createCustomer(customer)
  return customer
}

export const createFullCustomerWithComapanyInfoRegister = () => {
  const billingAddress: Address = {
    name: 'Peter Universum',
    street: 'Hugo-Junkers-Str. 5',
    state: 'DE-BO',
    zip: '60386',
    city: 'Frankfurt am Main',
    country: 'DE'
  }

  const shippingAddress: Address = {
    name: 'Peter Universum',
    street: 'Hugo-Junkers-Str. 5',
    state: 'DE-BO',
    zip: '60386',
    city: 'Frankfurt am Main',
    country: 'DE'
  }

  const companyInfo: CompanyInfo = {
    "registrationType": 'registered',
    "commercialRegisterNumber": 'HRB337681 MANNHEIM',
  }

  let customer: Customer = new Customer()
    .setFirstName('Max')
    .setLastName('Mustermann')
    .setSalutation(Salutation.mr)
    .setBirthDate('1972-12-24')
    .setCompany('Unzer')
    .setEmail('max.mustermann@unzer.com')
    .setPhone('+49 6221 64 71 101')
    .setMobile('+49 172 123 457')
    .setBillingAddress(billingAddress)
    .setShippingAddress(shippingAddress)
    .setCompanyInfo(companyInfo)

  return customer
}

export const createFullCustomerWithComapanyInfoNotRegister = () => {
  const billingAddress: Address = {
    name: 'Peter Universum',
    street: 'Hugo-Junkers-Str. 5',
    state: 'DE-BO',
    zip: '60386',
    city: 'Frankfurt am Main',
    country: 'DE'
  }

  const shippingAddress: Address = {
    name: 'Peter Universum',
    street: 'Hugo-Junkers-Str. 5',
    state: 'DE-BO',
    zip: '60386',
    city: 'Frankfurt am Main',
    country: 'DE'
  }

  const companyInfo: CompanyInfo = {
    "registrationType": 'not_registered',
    "function": "OWNER",
    "commercialSector": "AIRPORT"

  }

  let customer: Customer = new Customer()
    .setFirstName('Max')
    .setLastName('Mustermann')
    .setSalutation(Salutation.mr)
    .setBirthDate('1972-12-24')
    .setCompany('Unzer')
    .setEmail('max.mustermann@unzer.com')
    .setPhone('+49 6221 64 71 101')
    .setMobile('+49 172 123 457')
    .setBillingAddress(billingAddress)
    .setShippingAddress(shippingAddress)
    .setCompanyInfo(companyInfo)

  return customer
}