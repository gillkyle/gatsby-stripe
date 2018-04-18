import React from 'react'
import uuid from 'uuid/v4'

let stripeHandler
// hardcodded amount to charge users
const amount = 2500

const Checkout = class extends React.Component {
  state = {
    disabled: false,
    buttonText: 'BUY NOW',
    paymentMessage: '',
  }

  resetButton() {
    this.setState({ disabled: false, buttonText: 'BUY NOW' })
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
    this.setState({ disabled: true, buttonText: 'WAITING...' })
    stripeHandler.open({
      name: 'Demo Product',
      amount: amount,
      description: 'A product well worth your time',
      token: token => {
        /* 
        You can replace the url below to run the serverless function 
        from a different environment.

        run the netlify-lambda function in a dev environment:
        `http://localhost:9000/purchase`
        
        run the netlify-lambda function from a prod environment:
        `https://gatsby-stripe.netlify.com/.netlify/functions/purchase`
        
        run the aws-lambda function from a prod environment:
        `https://4m5jfeec48.execute-api.us-east-1.amazonaws.com/dev/checkout`
       */
        fetch(
          `https://4m5jfeec48.execute-api.us-east-1.amazonaws.com/dev/checkout`,
          {
            method: 'POST',
            body: JSON.stringify({
              token,
              amount,
              idempotency_key: uuid(),
            }),
            headers: new Headers({
              'Content-Type': 'application/json',
            }),
          }
        )
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
          alignItems: 'flex-start',
          padding: '3rem',
          boxShadow: '5px 5px 25px 0 rgba(46,61,73,.2)',
          backgroundColor: '#fff',
          borderRadius: '6px',
          maxWidth: '400px',
        }}
      >
        <h4>Spend your Money!</h4>
        <p>
          Use any email, 4242 4242 4242 4242 as the credit card number, any 3
          digit number, and any future date of expiration.
        </p>
        <button
          style={{
            fontSize: '13px',
            boxShadow: '2px 5px 10px rgba(0,0,0,.1)',
            textAlign: 'center',
            padding: '12px 60px',
            backgroundColor: '#02b3e4',
            color: '#fff',
            borderRadius: '6px',
            outline: 'none',
            letterSpacing: '1.5px',
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
