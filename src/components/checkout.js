import React from 'react'
import uuid from 'uuid/v4'

let stripeHandler
const amount = 2500

const Checkout = class extends React.Component {
  constructor(props) {
    super(props)

    this.openStripeCheckout = this.openStripeCheckout.bind(this)
  }

  componentDidMount() {
    console.log('mounting component')
    stripeHandler = StripeCheckout.configure({
      key: 'pk_test_kuhbxb0MMZsp6fj6aTNDnxUu',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
    })
  }

  openStripeCheckout(event) {
    event.preventDefault()

    stripeHandler.open({
      name: 'Demo E-Commerce',
      amount: amount,
      token: token => {
        // fetch(`https://gatsby-stripe.netlify.com/.netlify/functions/purchase`, {
        fetch(`http://localhost:8000/purchase`, {
          method: 'POST',
          body: JSON.stringify({
            token,
            amount,
            idempotency_key: uuid(),
          }),
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
        })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => console.log(response))
      },
    })
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          textAlign: 'center',
          padding: '3rem',
          boxShadow: '5px 5px 25px 0 rgba(46,61,73,.2)',
          backgroundColor: '#fff',
          borderRadius: '6px',
          height: '250px',
        }}
      >
        <span>Spend your Money!</span>
        <button
          style={{
            margin: '0rem 1rem',
            boxShadow: '2px 5px 10px rgba(0,0,0,.1)',
            textAlign: 'center',
            padding: '1rem 4rem',
            backgroundColor: '#02b3e4',
            color: '#fff',
            borderRadius: '3px',
            outline: 'none',
          }}
          onClick={event => this.openStripeCheckout(event)}
        >
          Buy Now
        </button>
      </div>
    )
  }
}

export default Checkout
