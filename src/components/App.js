import 'normalize.css/normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import React, { Component } from 'react'
import Header from './Header'
import Contacts from './Contacts'
import { Grid, Row, Col } from 'react-bootstrap'
import AuthOLock from 'auth0-lock'
import { Route } from 'react-router-dom'
import Index from './Index'
import ContactDetail from './ContactDetail'

const options = { auth: { redirect: false }, autoclose: true }

class App extends Component {
  componentWillMount () {
    this.lock = new AuthOLock('nk3p7FBKLuGx34xqpjDiyiQU6R_5qGWV', 'tomche.eu.auth0.com', options)
  }

  render () {
    return (
      <div>
        <Header lock={this.lock} />
        <Grid>
          <Row>
            <Col xs={12} md={3}>
              <Contacts />
            </Col>
            <Col xs={12} md={9}>
              <Route exact component={Index} />
              <Route path='/contact/:id' component={ContactDetail} />
            </Col>
          </Row>
        </Grid>
      </div >
    )
  }
}

export default App
