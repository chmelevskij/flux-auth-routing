import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import App from './components/App'

class Root extends Component {
  // We need to provide a list of routes
  // for our app, and in this case we are
  // doing so from a Root component
  render () {
    return (
      <BrowserRouter >
        <Route path='/' component={App} />
      </BrowserRouter >
    )
  }
}

export default Root
