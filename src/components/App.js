import 'normalize.css/normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import React, { Component } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Grid, Row, Col } from 'react-bootstrap'
import AuthOLock from 'auth0-lock'

const options = { auth: { redirect: false }, autoclose: true }

class App extends Component {
  componentWillMount () {
    this.lock = new AuthOLock('nk3p7FBKLuGx34xqpjDiyiQU6R_5qGWV', 'tomche.eu.auth0.com', options)
  }

  render () {
    return (
      <div>
        <Header lock={this.lock}></Header>
        <Grid>
          <Row>
            <Col xs={12} md={3}>
              <Sidebar location={this.props.location} />
            </Col>
            <Col xs={12} md={9}>
              {this.props.children}
            </Col>
          </Row>
        </Grid>
      </div >
    )
  }
}

export default App
