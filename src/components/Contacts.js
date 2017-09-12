import React, { Component } from 'react'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import ContactActions from '../actions/ContactActions'
import ContactStore from '../stores/ContactStore'
import { Link } from 'react-router-dom'

// We'll use this function to get a contact
// list item for each of the contacts in our list
function getContactListItem (contact) {
  return (
    <ListGroupItem key={contact.id}>
      <Link to={`/contact/${contact.id}`}>
        <h4>{contact.name}</h4>
      </Link>
    </ListGroupItem>
  )
}

class Contacts extends Component {
  constructor () {
    super()
    // For our initial state, we just want
    // and empty array of contacts
    this.state = {
      contacts: []
    }

    // We need to bind this to onChange so we can have
    // the proper this reference inside the method
    this.onChange = this.onChange.bind(this)
  }

  componentWillMount () {
    ContactStore.addChangeListener(this.onChange)
  }

  componentDidMount () {
    ContactActions.recieveContacts()
  }

  componentWillUnmount () {
    ContactStore.removeChangeListener(this.onChange)
  }

  onChange () {
    this.setState({
      contacts: ContactStore.getContacts()
    })
  }

  render () {
    let contactListItems
    if (this.state.contacts) {
      // Map over the contacts and get an element for each of them
      contactListItems = this.state.contacts.map(contact => getContactListItem(contact))
    }
    return (
      <div>
        <ListGroup>
          {contactListItems}
        </ListGroup>
      </div>
    )
  }
}

export default Contacts
