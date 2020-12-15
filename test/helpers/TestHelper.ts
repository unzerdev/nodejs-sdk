import Unzer from '../../src/Unzer'
import Card from '../../src/payments/types/Card'
import { authorizeObject, chargeAuthorizeObject } from '../../src/payments/business/Authorization'
import PaymentType from '../../src/payments/types/PaymentType'
import Paypage from '../../src/payments/paypage/Paypage'
import Linkpay from '../../src/payments/paypage/Linkpay'
import { Customer } from '../../src/payments/Customer'
import Metadata from '../../src/payments/Metadata'
import Basket, {basketItemObject} from '../../src/payments/Basket'
import { chargeObject } from '../../src/payments/business/Charge'
import { cancelChargeObject, cancelAuthorizeObject } from '../../src/payments/business/Cancel'
import Resources from '../../src/payments/business/Resources'
import { payoutObject } from '../../src/payments/business/Payout'
import { updateInstallmentSecuredObject } from '../../src/payments/types/InstallmentSecured'
import Shipment from '../../src/payments/business/Shipment'
import { recurringObject } from '../../src/payments/business/Recurring'
import { webhookObject } from '../../src/payments/business/Webhook'

export const getTimeout = () => 60000

export const createUnzerInstance = () => new Unzer('s-priv-2a10EmKm5bVDM29xUEhWuMMiOCNrtxNj', 'en')

export const createPaymentTypeCard = (unzer) => async (builder: boolean = false): Promise<Card> => {
  let card: Card = new Card()
    .setNumber('4711100000000000')
    .setCVC('123')
    .setExpiryDate('01/2022')
    .set3ds(false)

  if (builder) {
    return card
  }

  card = await unzer.createPaymentType(card)
  return card
}

export const createPaymentTypeCard3ds = (unzer) => async (builder: boolean = false): Promise<Card> => {
  let card: Card = new Card()
    .setNumber('4711100000000000')
    .setCVC('123')
    .setExpiryDate('01/2022')
    .set3ds(true)

  if (builder) {
    return card
  }

  card = await unzer.createPaymentType(card)
  return card
}

export const createEventWebhookPayload = () => {
  const webhookPayload: webhookObject = {
    url: `https://www.unzer.com/${Date.now()}`,
    event: 'all'
  }

  return webhookPayload
}

export const createEventListWebhookPayload = (eventList: Array<string>) => {
  const webhookPayload: webhookObject = {
    url: `https://www.unzer.com/${Date.now()}`,
    eventList,
  }

  return webhookPayload
}

export const getAuthorization = (typeId: string | PaymentType, customerId?: string | Customer) => {
  const authorizePayload: authorizeObject = {
    amount: 100,
    currency: 'EUR',
    typeId: typeId,
    paymentReference: 'Shop says thank you',
    returnUrl: 'https://www.google.at'
  }

  if (customerId !== undefined) {
    authorizePayload.customerId = customerId
  }

  return authorizePayload
}

export const getAuthorizationWithInterest = (typeId: string | PaymentType, customerId?: string | Customer, basketId?: string | Basket) => {
  const authorizePayload: authorizeObject = {
    amount: 100,
    effectiveInterestRate: 5.99,
    orderId: Math.floor(Date.now() / 1000).toString(),
    currency: 'EUR',
    typeId: typeId,
    paymentReference: 'Shop says thank you',
    returnUrl: 'https://www.google.at',
  }

  if (customerId !== undefined) {
    authorizePayload.customerId = customerId
  }

  if (basketId !== undefined) {
    authorizePayload.basketId = basketId
  }

  return authorizePayload
}

export const getAuthorizationWithOrderId = (typeId: string | PaymentType, customerId?: string | Customer) => {
  const authorizePayload: authorizeObject = {
    amount: 100,
    orderId: Math.floor(Date.now() / 1000).toString(),
    currency: 'EUR',
    typeId: typeId,
    paymentReference: 'Shop says thank you',
    returnUrl: 'https://www.google.at'
  }

  if (customerId !== undefined) {
    authorizePayload.customerId = customerId
  }

  return authorizePayload
}

export const getAuthorizationWithMetadataId = (typeId: string | PaymentType, metadataId: string) => {
  const authorizePayload: authorizeObject = {
    amount: 100,
    orderId: Math.floor(Date.now() / 1000).toString(),
    currency: 'EUR',
    typeId: typeId,
    returnUrl: 'https://www.google.at',
    metadataId: metadataId
  }

  return authorizePayload
}

export const getCancelAuthorization = (paymentId: string, authorizeId: string, amount: number) => {
  const authorizePayload: cancelAuthorizeObject = {
    amount: amount,
    authorizationId: authorizeId,
    paymentReference: 'Shop says thank you',
    paymentId: paymentId
  }

  return authorizePayload
}

export const getCharge = (typeId: string | PaymentType, customerId?: string | Customer) => {
  const chargePayload: chargeObject = {
    amount: 50,
    currency: 'EUR',
    paymentReference: 'Shop says thank you',
    returnUrl: 'https://www.google.at',
    typeId: typeId
  }

  if (customerId !== undefined) {
    chargePayload.customerId = customerId
  }

  return chargePayload
}

export const getChargeWithOrderAndInvoiceId = (typeId: string | PaymentType, customerId?: string | Customer) => {
  const chargePayload: chargeObject = {
    amount: 50,
    currency: 'EUR',
    orderId: Math.floor(Date.now() / 1000).toString(),
    invoiceId: Math.floor(Date.now() / 1000).toString(), 
    paymentReference: 'Shop says thank you',
    returnUrl: 'https://www.google.at',
    typeId: typeId
  }

  if (customerId !== undefined) {
    chargePayload.customerId = customerId
  }

  return chargePayload
}

export const getChargeWithCard3ds = (typeId: string | PaymentType, customerId?: string | Customer) => {
  const chargePayload: chargeObject = {
    amount: 50,
    currency: 'EUR',
    paymentReference: 'Shop says thank you',
    returnUrl: 'https://www.google.at',
    card3ds: true,
    typeId: typeId
  }

  if (customerId !== undefined) {
    chargePayload.customerId = customerId
  }

  return chargePayload
}

export const getChargeWithMetadataId = (typeId: string | PaymentType, metadataId?: string) => {
  const chargePayload: chargeObject = {
    amount: 50,
    currency: 'EUR',
    paymentReference: 'Shop says thank you',
    returnUrl: 'https://www.google.at',
    typeId: typeId,
    metadataId: metadataId
  }

  return chargePayload
}

export const getChargeWithOrderId = (typeId: string | PaymentType, customerId?: string | Customer) => {
  const chargePayload: chargeObject = {
    amount: 50,
    orderId: Math.floor(Date.now() / 1000).toString(),
    currency: 'EUR',
    paymentReference: 'Shop says thank you',
    returnUrl: 'https://www.google.at',
    typeId: typeId
  }

  if (customerId !== undefined) {
    chargePayload.customerId = customerId
  }

  return chargePayload
}

export const getChargeWithBasketId = (typeId: string | PaymentType, customerId?: string | Customer, basketId?: string) => {
  const chargePayload: chargeObject = {
    amount: 100.0000,
    basketId: basketId,
    currency: 'EUR',
    paymentReference: 'Shop says thank you',
    returnUrl: 'https://www.google.at',
    typeId: typeId
  }

  if (customerId !== undefined) {
    chargePayload.customerId = customerId
  }

  return chargePayload
}

export const getChargeAuthorization = (paymentId: string, amount?: number) => {
  const chargeAuthorizePayload: chargeAuthorizeObject = {
    paymentId: paymentId,
    paymentReference: 'Shop says thank you',
  }

  if (amount !== undefined) {
    chargeAuthorizePayload.amount = amount
  }

  return chargeAuthorizePayload
}

export const getCancelCharge = (paymentId: string, chargeId: string, amount?: number) => {
  const cancelCharge: cancelChargeObject = {
    paymentId: paymentId,
    chargeId: chargeId,
    paymentReference: 'Shop says thank you',
  }

  if (amount !== undefined) {
    cancelCharge.amount = amount
  }

  return cancelCharge
}

export const getCancelChargeHirePurchase = (paymentId: string, chargeId: string, amountGross: string, amountNet: string, amountVat: string) => {
  const cancelCharge: cancelChargeObject = {
    paymentId: paymentId,
    chargeId: chargeId,
    amountGross: amountGross,
    amountNet: amountNet,
    amountVat: amountVat,
    paymentReference: 'Shop says thank you',
  }

  return cancelCharge
}

export const getUpdateInstallmentSecured = (accountHolder: string, invoiceDueDate: string) => {
  const updateHirePurchaseObject: updateInstallmentSecuredObject = {
    accountHolder: accountHolder,
    invoiceDueDate: invoiceDueDate,
    iban: 'DE65500105174522535755',
    bic: 'AARBDE5W',
    invoiceDate: '2019-10-10',
  }

  return updateHirePurchaseObject
}

export const getPayout = (typeId: string | PaymentType, customerId?: string | Customer) => {
  const payoutPayload: payoutObject = {
    amount: 100,
    currency: 'EUR',
    typeId: typeId,
    returnUrl: 'https://www.google.at',
    paymentReference: 'Test payout transaction'
  }

  if (customerId !== undefined) {
    payoutPayload.customerId = customerId
  }

  return payoutPayload
}

export const createMetadataValue = () => {
  const metadata = new Metadata()
  const objValue = {
    shopId: Math.floor(Date.now() / 1000).toString(),
    shopCode: 'COD.3456',
    invoiceNumber: Math.floor(Date.now() / 1000).toString(),
  }
  metadata.setValue(objValue)

  return metadata
}

export const createBasket = () => {
  const basket = new Basket()
  const orderId = (Math.random() * 1000000).toString()

  basket.setAmountTotalGross("100.00")
  basket.setAmountTotalDiscount("0.00")
  basket.setCurrencyCode("EUR")
  basket.setOrderId(orderId)
  basket.setNote("136d24be")

  const basketItem: basketItemObject = {
    title: "Macbook Pro",
    subTitle: "This is brand new Mid 2019 version",
    imageUrl: "https://dev-hpp-images.s3.amazonaws.com/1222/bsk_2_4DA2BA1D090870903E76888299A404185960B58F05734F3044E96B7FBECDBA09.png",
    basketItemReferenceId: "12345",
    unit: "Pc.",
    quantity: 1,
    amountDiscount: "100.00",
    vat: "0",
    amountGross: "100.00",
    amountVat: "0",
    amountPerUnit: "100.00",
    amountNet: "100.00",
    type: "tech"
  }

  basket.addItem(basketItem)

  return basket
}

export const createBasketWithAmountVat = () => {
  const basket = new Basket()
  const orderId = (Math.random() * 1000000).toString()

  basket.setAmountTotalGross("100.00")
  basket.setAmountTotalDiscount("0.00")
  basket.setAmountTotalVat("10.00")
  basket.setCurrencyCode("EUR")
  basket.setOrderId(orderId)
  basket.setNote("136d24be")

  const basketItem: basketItemObject = {
    title: "Macbook Pro",
    subTitle: "This is brand new Mid 2019 version",
    imageUrl: "https://www.heidelpay.com/typo3conf/ext/heidelpay_site/Resources/Public/Images/Heidelpay-Logo_weiss.svg",
    basketItemReferenceId: "12345",
    unit: "Pc.",
    quantity: 1,
    amountDiscount: "0",
    vat: "0",
    amountGross: "100.00",
    amountVat: "10.00",
    amountPerUnit: "100.00",
    amountNet: "90.00",
    type: "tech"
  }

  basket.addItem(basketItem)

  return basket
}

export const createBasketWithOneItemsForUpdate = (orderId) => {
  const basket = new Basket()

  basket.setAmountTotalGross("80.00")
  basket.setAmountTotalDiscount("0.00")
  basket.setCurrencyCode("EUR")
  basket.setOrderId(orderId)
  basket.setNote("New note update for 1 item")

  const basketItem: basketItemObject = {
    title: "Macbook Air",
    subTitle: "This is brand new Mid 2019 version",
    imageUrl: "https://www.heidelpay.com/typo3conf/ext/heidelpay_site/Resources/Public/Images/Heidelpay-Logo_weiss.svg",
    basketItemReferenceId: "2456",
    unit: "Pc.",
    quantity: 1,
    amountDiscount: "80.00",
    vat: "0",
    amountGross: "80.00",
    amountVat: "0",
    amountPerUnit: "80.00",
    amountNet: "80.00",
    type: "tech"
  }

  basket.addItem(basketItem)

  return basket
}

export const createBasketWithTwoItemsForUpdate = (orderId) => {
  const basket = new Basket()

  basket.setAmountTotalGross("180.00")
  basket.setAmountTotalDiscount("0.00")
  basket.setCurrencyCode("EUR")
  basket.setOrderId(orderId)
  basket.setNote("New note update for 2 items")

  const basketItem: basketItemObject = {
    title: "Macbook Pro",
    basketItemReferenceId: "12345",
    unit: "Pc.",
    quantity: 1,
    amountDiscount: "100.00",
    vat: "0",
    amountGross: "100.00",
    amountVat: "0",
    amountPerUnit: "100.00",
    amountNet: "100.00",
    type: "tech"
  }

  const basketNextItem: basketItemObject = {
    title: "Macbook Air",
    basketItemReferenceId: "2456",
    unit: "Pc.",
    quantity: 1,
    amountDiscount: "80.00",
    vat: "0",
    amountGross: "80.00",
    amountVat: "0",
    amountPerUnit: "80.00",
    amountNet: "80.00",
    type: "tech"
  }

  basket.addItem(basketItem)
  basket.addItem(basketNextItem)

  return basket
}

export const createMinimumPaypage = () => {
  const paypage = new Paypage()

  paypage.setAmount(100)
  .setCurrency('EUR')
  .setReturnUrl('https://www.unzer.com')
  .setShopDescription('A cool shop in the neighborhood')
  .setAdditionalAttributes({
    effectiveInterestRate: 1
  })

  return paypage
} 

export const createMinimumPaypageWithResources = () => {
  const paypage = new Paypage()
  const resources = new Resources()

  resources.setCustomerId('s-cst-cfb84f279366')
  resources.setMetadataId('s-mtd-h6kvv7x9nalw')

  paypage.setAmount(100)
  .setCurrency('EUR')
  .setReturnUrl('https://www.unzer.com')
  .setResources(resources)

  return paypage
} 

export const createFullPaypage = () => {
  const paypage = new Paypage()

  paypage.setAmount(100)
  .setCurrency('EUR')
  .setReturnUrl('https://www.unzer.com')
  .setLogoImage('http://www.the-alley.vn/images/page/info-img.png')
  .setFullPageImage('https://i.ytimg.com/vi/v1SabYdIlZI/maxresdefault.jpg')
  .setShopName('A cool shop in the neighborhood')
  .setTermsAndConditionUrl('https://www.unzer.com/en/')
  .setPrivacyPolicyUrl('https://www.unzer.com/en/')
  .setImpressumUrl('https://www.unzer.com/en/')
  .setHelpUrl('https://www.unzer.com/en/')
  .setContactUrl('https://www.unzer.com/en/')

  return paypage
} 

export const createFullPaypageWithExcludedTypes = () => {
  const paypage = new Paypage()

  paypage.setAmount(100)
    .setCurrency('EUR')
    .setReturnUrl('https://www.unzer.com')
    .setLogoImage('http://www.the-alley.vn/images/page/info-img.png')
    .setFullPageImage('https://i.ytimg.com/vi/v1SabYdIlZI/maxresdefault.jpg')
    .setShopName('A cool shop in the neighborhood')
    .setTermsAndConditionUrl('https://www.unzer.com/en/')
    .setPrivacyPolicyUrl('https://www.unzer.com/en/')
    .setImpressumUrl('https://www.unzer.com/en/')
    .setHelpUrl('https://www.unzer.com/en/')
    .setContactUrl('https://www.unzer.com/en/')
    .setExcludeTypes(['paypal', 'invoice-factoring'])

  return paypage
}

export const getShipmentOrderAndInvoiceId = () => {
  const shipment = new Shipment(createUnzerInstance())

  const invoiceId = Math.floor(Date.now() / 1000).toString()
  const orderId = Math.floor(Date.now() / 1000).toString()

  shipment.setInvoiceId(invoiceId)
  shipment.setOrderId(orderId)

  return { invoiceId, orderId }
}

export const getRequiredRecurringData = () => {
  const recurringPayload: recurringObject = {
    returnUrl: 'https://dev.unzer.com'
  }
  
  return recurringPayload
}

export const getCompleteRecurringData = () => {
  const recurringPayload: recurringObject = {
    returnUrl: 'https://dev.unzer.com',
    customerId: 's-cst-cfb84f279366',
    metadataId: 's-mtd-h6kvv7x9nalw',
  }

  return recurringPayload
}

export const createMinimumLinkpay = () => {
  const linkpay = new Linkpay()

  return linkpay
}

export const createExtensiveLinkpay = () => {
  const linkpay = new Linkpay()
  const resources = new Resources()
  const css = {
    header: 'background-color: white'
  }

  resources.setCustomerId('s-cst-cfb84f279366')
  resources.setMetadataId('s-mtd-h6kvv7x9nalw')

    linkpay
      .setAlias(`Alias-${Date.now()}`)
      .setAmount(100)
      .setAdditionalAttributes({
        effectiveInterestRate: 1
      })
      .setExcludeTypes(['card'])
      .setExpirationDate('2021-12-12')
      .setCard3ds('true')
      .setCurrency('EUR')
      .setInvoiceIdRequired('false')
      .setIntention('Checkout')
      .setOrderIdRequired('false')
      .setReturnUrl('https://www.unzer.com')
      .setLogoImage('http://www.the-alley.vn/images/page/info-img.png')
      .setFullPageImage('https://i.ytimg.com/vi/v1SabYdIlZI/maxresdefault.jpg')
      .setShopName('A cool shop in the neighborhood')
      .setTermsAndConditionUrl('https://www.unzer.com/en/')
      .setPrivacyPolicyUrl('https://www.unzer.com/en/')
      .setShopDescription('Come and buy')
      .setImprintUrl('https://www.unzer.com/en/')
      .setHelpUrl('https://www.unzer.com/en/')
      .setContactUrl('https://www.unzer.com/en/')
      .setShippingAddressRequired('true')
      .setBillingAddressRequired('true')
      .setTagline('Tagline123')
      .setResources(resources)
      .setCss(css)

  return linkpay
}

export const createLinkpayWithOrderIdAndCss = () => {
  const linkpay = new Linkpay()
  const orderId = Math.floor(Date.now() / 1000).toString()
  const css = {
    header: 'background-color: white'
  }

  linkpay
    .setAmount(100)
    .setOrderId(orderId)
    .setCss(css)
    .setTagline('Tagline123')

  return linkpay
}

export const updateLinkpayAmountAndTagline = () => {
  const linkpay = new Linkpay()

  linkpay
    .setAmount(120)
    .setTagline('TaglineNew')

  return linkpay
}