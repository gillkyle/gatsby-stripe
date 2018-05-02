import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import './index.css'

const layoutStyles = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background:
    'linear-gradient(to bottom right, rgb(251, 244, 251), rgb(202, 161, 225))',
}

const TemplateWrapper = ({ children }) => (
  <div style={layoutStyles}>
    <Helmet
      title="Gatsby Stripe"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <div>{children()}</div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
