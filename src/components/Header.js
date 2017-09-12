import React, { Component } from 'react'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import AuthActions from '../actions/AuthActions'
import AuthStore from '../stores/AuthStore'

class Header extends Component {
  constructor () {
    super()
    this.state = {
      authenticated: AuthStore.isAuthenticated()
    }
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  login () {
    // We can call the show method from AuthOLock,
    // which is passed down as a prop, to allow
    // the user to log in
    this.props.lock.on('authenticated', authResult => {
      this.props.lock.getUserInfo(authResult.accessToken, (err, profile) => {
        if (err) {
          alert(err)
          return
        }
        AuthActions.logUserIn(profile, authResult.idToken)
        this.setState({ authenticated: true })
      })
    })
    this.props.lock.show()
  }

  logout () {
    AuthActions.logUserOut()
    this.setState({ authenticated: false })
  }

  render () {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='#'>React Contacts</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem onClick={this.login}>Login</NavItem>
          <NavItem onClick={this.logout}>Logout</NavItem>
        </Nav>
      </Navbar>
    )
  }
}

export default Header
