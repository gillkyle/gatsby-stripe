// This file is for developing the actual stripe charge,
// which is transpiled into the /lambda folder
require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const statusCode = 200
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}

exports.handler = function(event, context, callback) {
  // don't do anything unless you are posting to the endpoint
  if (event.httpMethod !== 'POST' || !event.body) {
    callback(null, {
      statusCode,
      headers,
      body: '',
    })
  }

  // parse the body contents into the data variable
  const data = JSON.parse(event.body)
  console.log(data)

  // make sure we have all required data
  if (!data.token || !data.amount || !data.idempotency_key) {
    console.error('Required information is missing.')

    callback(null, {
      statusCode,
      headers,
      body: JSON.stringify({ status: 'missing-information' }),
    })
    return
  }

  stripe.charges.create(
    {
      currency: 'usd',
      amount: data.amount,
      source: data.token.id,
      receipt_email: data.token.email,
      description: `a sample test charge`,
    },
    {
      idempotency_key: data.idempotency_key,
    },
    (err, charge) => {
      if (err !== null) {
        console.log(err)
      }

      let status =
        charge === null || charge.status !== 'succeeded'
          ? 'failed'
          : charge.status

      callback(null, {
        statusCode,
        headers,
        body: JSON.stringify({ status }),
      })
    }
  )
}
