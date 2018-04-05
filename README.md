# Gatsby Stripe Checkout Demo
This project was bootstrapped using the `gatsby-starter-default` starter, and is built using Gatsby, Stripe Checkout, and Netlify Functions. This demo was adapted from a tutorial [here](https://github.com/alexmacarthur/netlify-lambda-function-example/) by alexmacarthur.

The majority of the example code of this project is in the `src/components/checkout.js` and `lambda-dev/purchase.js` files

The `checkout.js` file defines a component that sets up the config for Stripe Checkout (Stripe's simplest drop-in payment method) using my publishable key. 

## Installation

Clone the project to your computer:

```sh
git clone https://github.com/gillkyle/gatsby-stripe.git
cd gatsby-stripe
```

Install dependencies:

```sh
npm install
```

or...

```sh
yarn
```

Make sure that you have the Gatsby CLI program installed:

```sh
npm install --global gatsby-cli
```


Then you can run it with:

```sh
npm run develop
```

or...

```sh
gatsby develop
```

## Deploy

Or deploy your own fork straight to Netlify:
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gillkyle/gatsby-stripe)
