const Unzer = require('@heidelpay/nodejs-sdk').default
const Card = require('@heidelpay/nodejs-sdk').Card
const Customer = require('@heidelpay/nodejs-sdk').Customer

const excuteScript = function() {
  const unzer = new Unzer('s-priv-2a10BF2Cq2YvAo6ALSGHc3X7F42oWAIp')
  console.log('SDK_VERSION', unzer.getVersion())

  const card = new Card('4711100000000000', '01/2022')
  card.setCVC('123')
  card.set3ds(true)

  const customer = new Customer('Rene', 'Fred')

  unzer.createCustomer(customer).then(function(newCustomer) {
    console.log('newCustomer', newCustomer.getCustomerId())

    return unzer.createPaymentType(card)
  }).then(function(paymentCard) {    
    console.log('paymentCard', paymentCard.getId())
    console.log('paymentCard', paymentCard.get3ds())

    return paymentCard.authorize({
      amount: 100,
      orderId: Math.floor(Date.now() / 1000).toString(),
      currency: 'EUR',
      typeId: paymentCard.getId(),
      returnUrl: 'https://www.google.at'
    })
  }).then(function(authorize) {
    console.log('authorize', authorize.getId())
    console.log('authorize', authorize.getOrderId())
    
    // Authorize successful with payment Card
  }).catch(function (error) {
    console.log('error', error.message)
    // Handle error
  });
}

excuteScript()
