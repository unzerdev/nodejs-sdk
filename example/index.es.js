const Heidelpay = require('@heidelpay/nodejs-sdk').default
const Card = require('@heidelpay/nodejs-sdk').Card
const Customer = require('@heidelpay/nodejs-sdk').Customer

const excuteScript = function() {
  const heidelpay = new Heidelpay('s-priv-2a102ZMq3gV4I3zJ888J7RR6u75oqK3n')

  const card = new Card('4711100000000000', '01/2022').setCVC('123')
  const customer = new Customer('Rene', 'Fred')

  heidelpay.createCustomer(customer).then(function(newCustomer) {
    console.log('newCustomer', newCustomer.getCustomerId())

    return heidelpay.createPaymentType(card)
  }).then(function(paymentCard) {    
    console.log('paymentCard', paymentCard.getId())

    return paymentCard.authorize({
      amount: 100,
      currency: 'EUR',
      typeId: paymentCard.getId(),
      returnUrl: 'https://www.google.at'
    })
  }).then(function(authorize) {
    console.log('authorize', authorize.getId())
    // Authorize successful with payment Card
  }).catch(function (error) {
    console.log('error', error)
    // Handle error
  });
}

excuteScript()
