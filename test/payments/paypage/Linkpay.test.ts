import Heidelpay from '../../../src/Heidelpay'
import * as TestHelper from '../../helpers/TestHelper'
import Linkpay from '../../../src/payments/paypage/Linkpay'

describe('Linkpay test', () => {
  let heidelpay: Heidelpay

  beforeAll(() => {
    jest.setTimeout(TestHelper.getTimeout())
    heidelpay = TestHelper.createHeidelpayInstance()
  })

  it('Test init linkpay authorize', async () => {
    const linkpay: Linkpay = await heidelpay.initAuthorizeLinkpay(TestHelper.createMinimumLinkpay())
    expect(linkpay).toBeInstanceOf(Linkpay)
    expect(linkpay.getId()).toBeDefined()
    expect(linkpay.getRedirectUrl()).toBeDefined()
    expect(linkpay.getAction()).toEqual('AUTHORIZE')  
  })

  it('Test init linkpay charge', async () => {
    const linkpay: Linkpay = await heidelpay.initChargeLinkpay(TestHelper.createMinimumLinkpay())
    expect(linkpay).toBeInstanceOf(Linkpay)
    expect(linkpay.getId()).toBeDefined()
    expect(linkpay.getRedirectUrl()).toBeDefined()
    expect(linkpay.getAction()).toEqual('CHARGE')
  })

  it('Test init linkpay authorize with extensive data', async () => {
    const linkpay: Linkpay = await heidelpay.initAuthorizeLinkpay(TestHelper.createExtensiveLinkpay())

    expect(linkpay).toBeInstanceOf(Linkpay)
    expect(linkpay.getId()).toBeDefined()
    expect(linkpay.getRedirectUrl()).toBeDefined()
    expect(linkpay.getAction()).toEqual('AUTHORIZE')
    expect(linkpay.getAlias()).toBeDefined()
    expect(linkpay.getExpirationDate()).toEqual('2021-12-12 23:59:59')
    expect(linkpay.getCard3ds()).toEqual('true')
    expect(linkpay.getCurrency()).toEqual('EUR')
    expect(linkpay.getIntention()).toEqual('Checkout')
    expect(linkpay.getInvoiceIdRequired()).toEqual('false')
    expect(linkpay.getOrderIdRequired()).toEqual('false')
    expect(linkpay.getExcludeTypes()).toContain('card')
    expect(linkpay.getLogoImage()).toBeDefined()
    expect(linkpay.getFullPageImage()).toBeDefined()
    expect(linkpay.getShopName()).toEqual('A cool shop in the neighborhood')
    expect(linkpay.getReturnUrl()).toEqual('https://www.unzer.com')
    expect(linkpay.getTermsAndConditionUrl()).toEqual('https://www.unzer.com/en/')
    expect(linkpay.getPrivacyPolicyUrl()).toEqual('https://www.unzer.com/en/')
    expect(linkpay.getShopDescription()).toEqual('Come and buy')
    expect(linkpay.getImprintUrl()).toEqual('https://www.unzer.com/en/')
    expect(linkpay.getContactUrl()).toEqual('https://www.unzer.com/en/')
    expect(linkpay.getShippingAddressRequired()).toEqual('true')
    expect(linkpay.getBillingAddressRequired()).toEqual('true')
    expect(linkpay.getTagline()).toEqual('Tagline123')
    expect(linkpay.getAmount()).toEqual('100.0000')
    expect(linkpay.getResources()).toBeDefined()
    expect(linkpay.getAdditionalAttributes()).toBeDefined()
  })

  it('Test init linkpay charge with extensive data', async () => {
    const linkpay: Linkpay = await heidelpay.initChargeLinkpay(TestHelper.createExtensiveLinkpay())

    expect(linkpay).toBeInstanceOf(Linkpay)
    expect(linkpay.getId()).toBeDefined()
    expect(linkpay.getRedirectUrl()).toBeDefined()
    expect(linkpay.getAction()).toEqual('CHARGE')
    expect(linkpay.getAlias()).toBeDefined()
    expect(linkpay.getExpirationDate()).toEqual('2021-12-12 23:59:59')
    expect(linkpay.getCard3ds()).toEqual('true')
    expect(linkpay.getCurrency()).toEqual('EUR')
    expect(linkpay.getIntention()).toEqual('Checkout')
    expect(linkpay.getInvoiceIdRequired()).toEqual('false')
    expect(linkpay.getOrderIdRequired()).toEqual('false')
    expect(linkpay.getExcludeTypes()).toContain('card')
    expect(linkpay.getLogoImage()).toBeDefined()
    expect(linkpay.getFullPageImage()).toBeDefined()
    expect(linkpay.getShopName()).toEqual('A cool shop in the neighborhood')
    expect(linkpay.getReturnUrl()).toEqual('https://www.unzer.com')
    expect(linkpay.getTermsAndConditionUrl()).toEqual('https://www.unzer.com/en/')
    expect(linkpay.getPrivacyPolicyUrl()).toEqual('https://www.unzer.com/en/')
    expect(linkpay.getShopDescription()).toEqual('Come and buy')
    expect(linkpay.getImprintUrl()).toEqual('https://www.unzer.com/en/')
    expect(linkpay.getContactUrl()).toEqual('https://www.unzer.com/en/')
    expect(linkpay.getShippingAddressRequired()).toEqual('true')
    expect(linkpay.getBillingAddressRequired()).toEqual('true')
    expect(linkpay.getTagline()).toEqual('Tagline123')
    expect(linkpay.getAmount()).toEqual('100.0000')
    expect(linkpay.getResources()).toBeDefined()
    expect(linkpay.getAdditionalAttributes()).toBeDefined()
  })

  it('Test init linkpay charge with CSS and orderId', async () => {
    const linkpay: Linkpay = await heidelpay.initChargeLinkpay(TestHelper.createLinkpayWithOrderIdAndCss())

    expect(linkpay).toBeInstanceOf(Linkpay)
    expect(linkpay.getId()).toBeDefined()
    expect(linkpay.getCss()).toBeDefined()
    expect(linkpay.getAmount()).toEqual('100.0000')
    expect(linkpay.getTagline()).toEqual('Tagline123')
  })

  it('Test update linkpay (charge)', async () => {
    const linkpay: Linkpay = await heidelpay.initChargeLinkpay(TestHelper.createExtensiveLinkpay())
    const linkpayId: string = linkpay.getId()
    const updatedLinkpay: Linkpay = await heidelpay.updateLinkpay(linkpayId, TestHelper.updateLinkpayAmountAndTagline())

    expect(linkpay).toBeInstanceOf(Linkpay)
    expect(linkpay.getId()).toBeDefined()
    expect(linkpay.getAmount()).toEqual('100.0000')
    expect(linkpay.getTagline()).toEqual('Tagline123')

    expect(updatedLinkpay).toBeInstanceOf(Linkpay)
    expect(updatedLinkpay.getId()).toBeDefined()
    expect(updatedLinkpay.getAmount()).toEqual('120.0000')
    expect(updatedLinkpay.getTagline()).toEqual('TaglineNew')
    expect(updatedLinkpay.getIntention()).toEqual('Checkout')
  })

  it('Test update linkpay (authorize)', async () => {
    const linkpay: Linkpay = await heidelpay.initAuthorizeLinkpay(TestHelper.createExtensiveLinkpay())
    const linkpayId: string = linkpay.getId()
    const updatedLinkpay: Linkpay = await heidelpay.updateLinkpay(linkpayId, TestHelper.updateLinkpayAmountAndTagline())

    expect(linkpay).toBeInstanceOf(Linkpay)
    expect(linkpay.getId()).toBeDefined()
    expect(linkpay.getAmount()).toEqual('100.0000')
    expect(linkpay.getTagline()).toEqual('Tagline123')

    expect(updatedLinkpay).toBeInstanceOf(Linkpay)
    expect(updatedLinkpay.getId()).toBeDefined()
    expect(updatedLinkpay.getAmount()).toEqual('120.0000')
    expect(updatedLinkpay.getTagline()).toEqual('TaglineNew')
    expect(updatedLinkpay.getIntention()).toEqual('Checkout')
  })

  it('Test delete linkpay', async () => {
    const linkpay: Linkpay = await heidelpay.initChargeLinkpay(TestHelper.createLinkpayWithOrderIdAndCss())
    const linkpayId: string = linkpay.getId()
    const deletedLinkpay = await heidelpay.deleteLinkpay(linkpayId)
    
    expect(deletedLinkpay).toBe('')
  })
})
