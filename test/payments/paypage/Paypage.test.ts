import Unzer from '../../../src/Unzer'
import * as TestHelper from '../../helpers/TestHelper'
import Paypage from '../../../src/payments/paypage/Paypage'

describe('Paypage test', () => {
  let unzer: Unzer

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    unzer = TestHelper.createUnzerInstance()
  })

  it('Test init paypage authorize', async () => {
    const paypage: Paypage = await unzer.initAuthorizePaypage(TestHelper.createMinimumPaypage())

    expect(paypage).toBeInstanceOf(Paypage)
    expect(paypage.getId()).toBeDefined()
    expect(paypage.getRedirectUrl()).toBeDefined()
    expect(paypage.getAction()).toEqual('AUTHORIZE')
  })

  it('Test init paypage charge', async () => {
    const paypage: Paypage = await unzer.initChargePaypage(TestHelper.createMinimumPaypage())

    expect(paypage).toBeInstanceOf(Paypage)
    expect(paypage.getId()).toBeDefined()
    expect(paypage.getRedirectUrl()).toBeDefined()
    expect(paypage.getAction()).toEqual('CHARGE')
  })

  it('Test init paypage authorize with full paypage', async () => {
    const paypage: Paypage = await unzer.initAuthorizePaypage(TestHelper.createFullPaypage())
    
    expect(paypage).toBeInstanceOf(Paypage)
    expect(paypage.getId()).toBeDefined()
    expect(paypage.getRedirectUrl()).toBeDefined()
    expect(paypage.getAction()).toEqual('AUTHORIZE')
  })

  it('Test init paypage charge with full paypage', async () => {
    const paypage: Paypage = await unzer.initChargePaypage(TestHelper.createFullPaypage())

    expect(paypage).toBeInstanceOf(Paypage)
    expect(paypage.getId()).toBeDefined()
    expect(paypage.getRedirectUrl()).toBeDefined()
    expect(paypage.getAction()).toEqual('CHARGE')
  })

  it('Test init paypage charge with resources', async () => {
    const paypage: Paypage = await unzer.initChargePaypage(TestHelper.createMinimumPaypageWithResources())

    expect(paypage).toBeInstanceOf(Paypage)
    expect(paypage.getId()).toBeDefined()
    expect(paypage.getRedirectUrl()).toBeDefined()
    expect(paypage.getAction()).toEqual('CHARGE')
  })

  it('Test init paypage authorize with excluded types', async () => {
    const paypage: Paypage = await unzer.initAuthorizePaypage(TestHelper.createFullPaypageWithExcludedTypes())
    const excludedTypes: Array<string> = ['paypal', 'invoice-factoring']

    expect(paypage).toBeInstanceOf(Paypage)
    expect(paypage.getId()).toBeDefined()
    expect(paypage.getRedirectUrl()).toBeDefined()
    expect(paypage.getAction()).toEqual('AUTHORIZE')
    expect(paypage.getExcludeTypes()).toEqual(expect.arrayContaining(excludedTypes))
    expect(paypage.getExcludeTypes()).toContain('paypal')
    expect(paypage.getExcludeTypes()).toContain('invoice-factoring')
  })

  it('Test init paypage charge with excluded types', async () => {
    const paypage: Paypage = await unzer.initChargePaypage(TestHelper.createFullPaypageWithExcludedTypes())
    const excludedTypes: Array<string> = ['paypal', 'invoice-factoring']

    expect(paypage).toBeInstanceOf(Paypage)
    expect(paypage.getId()).toBeDefined()
    expect(paypage.getRedirectUrl()).toBeDefined()
    expect(paypage.getAction()).toEqual('CHARGE')
    expect(paypage.getExcludeTypes()).toEqual(expect.arrayContaining(excludedTypes))
    expect(paypage.getExcludeTypes()).toContain('paypal')
    expect(paypage.getExcludeTypes()).toContain('invoice-factoring')
  })
})
