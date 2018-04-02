import React from 'react'
import Button from '../Button'

const Card = () => (
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
    Buy this product
    <Button />
  </div>
)

export default Card
