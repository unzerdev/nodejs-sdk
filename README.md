# Unzer SDK NodeJS

![License](https://img.shields.io/npm/l/@heidelpay/nodejs-sdk.svg)
[![Version](https://img.shields.io/npm/v/@heidelpay/nodejs-sdk.svg)](https://www.npmjs.com/package/@heidelpay/nodejs-sdk)
[![Download](https://img.shields.io/npm/dw/@heidelpay/nodejs-sdk.svg)](https://www.npmjs.com/package/@heidelpay/nodejs-sdk)

The Unzer SDK NodeJS provides convenient access to the Unzer API from
applications written in server-side JavaScript.

# **Documentation**

See the [Node API docs](https://docs.unzer.com/docs/nodejs-sdk).

# **Installation**

Install the package with:

    npm install --save @heidelpay/nodejs-sdk

# **Usages**

> The package needs to be configured with your private key. Make sure you have it first

Using Common JS
``` js
var Unzer = require('@heidelpay/nodejs-sdk').default;

// Create new instance Unzer
var unzer = new Unzer('s-priv-...');
```

Or using ES module

``` js
import Unzer from '@heidelpay/nodejs-sdk';

// Create new instance Unzer
const unzer = new Unzer('s-priv-...');
```

Or using TypeScript:

``` ts
import Unzer from '@heidelpay/nodejs-sdk';

// Create new instance Unzer
const unzer = new Unzer('s-priv-...');
```

# **Example**
## Using Promise
> Authorize with a payment type (Card)
```js
var Unzer = require('@heidelpay/nodejs-sdk').default;
var Card = require('@heidelpay/nodejs-sdk').Card;
var Customer = require('@heidelpay/nodejs-sdk').Customer;

// Create new instance Unzer
var unzer = new Unzer('s-priv-...');

// New a card with pan number and exipry date
var card = new Card('471110xxxxxx0000', '01/xxxx');

// Set CVC
card.setCVC('xxx');

// Create customer object
var customer = new Customer('Rene', 'Fred');

heidelpay.createCustomer(customer).then(function(newCustomer) {
  // Create payment type then authorize (Card)
  return unzer.createPaymentType(card);
}).then(function(paymentCard) {    
  // Authorize with payment card
  return paymentCard.authorize({
    amount: 100,
    currency: 'EUR',
    typeId: paymentCard.getId(),
    returnUrl: 'https://www.google.at'
  })
}).then(function(authorize) {
  // Authorize successful
  console.log('authorize', authorize.getId());
}).catch(function (error) {
  // Handle error
  console.log('error', error);
});
```

## Using async / await (ES6 style)
```js
import Unzer, {Card} from '@heidelpay/nodejs-sdk';

// Create new instance Unzer
const unzer = new Unzer('s-priv-...');

// New a card with pan number and exipry date
const card = new Card('471110xxxxxx0000', '01/xxxx');

// Set CVC
card.setCVC('xxx');

// Create customer object
const customer = new Customer('Rene', 'Fred');

// Should wrap these code into async function (async/await syntax)
try {
  // Create a new customer
  const newCustomer = await unzer.createCustomer(customer);

  // Create payment type then authorize (Card)
  const paymentCard = await unzer.createPaymentType(card);

  // Authorize with payment card
  const authorize = await paymentCard.authorize({
    amount: 100,
    currency: 'EUR',
    typeId: paymentCard.getId(),
    returnUrl: 'https://www.google.at'
  });
} catch (error) {
  // Handle error
  console.log('error', error);
}
```

## Supported payment types
*   Card (credit card and debit card) + Recurring
*   Giropay
*   iDEAL
*   Invoice (guaranteed)
*   PayPal + Recurring
*   Prepayment
*   Przelewy24
*   SEPA direct debit (guaranteed) + Recurring
*   SOFORT
*   EPS
*   Unzer Bank Transfer
*   Alipay
*   WeChat Pay
*   Invoice Factoring
*   Unzer Instalment

## Supported features
*   Webhooks and event handling
*   Payment Page (embedded and hosted)
*   Payout (Credit)
*   Recurring Payment

## Support
For any issues or questions please get in touch with our support team.

### Web page
[https://docs.unzer.com/](https://docs.unzer.com/)

### Email
[support@unzer.com](mailto:support@unzer.com)

### Phone
[+49 6221 43101-00](tel:+49-6221 43101 00)

# **License**
Apache 2.0
