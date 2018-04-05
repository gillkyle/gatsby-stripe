import React from 'react'
import uuid from 'uuid/v4'

let stripeHandler
// hardcodded amount to charge users
const amount = 2500

const Checkout = class extends React.Component {
  state = {
    disabled: false,
    buttonText: 'Buy Now',
    paymentMessage: '',
  }

  resetButton() {
    this.setState({ disabled: false, buttonText: 'Buy Now' })
  }

  componentDidMount() {
    stripeHandler = StripeCheckout.configure({
      key: 'pk_test_kuhbxb0MMZsp6fj6aTNDnxUu',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      closed: () => {
        this.resetButton()
      },
    })
  }

  openStripeCheckout(event) {
    event.preventDefault()
    this.setState({ disabled: true, buttonText: 'Waiting...' })
    stripeHandler.open({
      name: 'Demo Product',
      amount: amount,
      description: 'A product well worth your time',
      token: token => {
        /* 
        You can replace the url below with this one to run 
        the netlify-lambda function in a dev environment:
        fetch(`http://localhost:9000/purchase`, {
        */
        fetch(`https://gatsby-stripe.netlify.com/.netlify/functions/purchase`, {
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
          .then(res => {
            console.log('transaction sent')
            this.resetButton()
            this.setState({ paymentMessage: 'Payment Successful!' })
            return res.json()
          })
          .catch(error => {
            console.error('Error:', error)
            this.setState({ paymentMessage: 'Payment Failed' })
          })
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
          disabled={this.state.disabled}
        >
          {this.state.buttonText}
        </button>
        {this.state.paymentMessage}
      </div>
    )
  }
}

export default Checkout
