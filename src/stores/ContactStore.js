import AppDispatcher from '../dispatcher/AppDispatcher'
import ContactConstants from '../constants/ContactConstants'
import { EventEmitter } from 'events'

const CHANGE_EVENT = 'change'

let _contacts = []
let _contact = {}

function setContacts (contacts) {
  _contacts = contacts
}

function setContact (contact) {
  _contact = contact
}

class ContactStoreClass extends EventEmitter {
  emitChange () {
    this.emit(CHANGE_EVENT)
  }

  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getContacts () {
    return _contacts
  }

  getContact () {
    return _contact
  }
}

const ContactStore = new ContactStoreClass()

// Here we register a allback for the dispathcer
// and look for our various action types so we can
// respond approprately
ContactStore.dispatchToken = AppDispatcher.register(action => {
  switch (action.actionType) {
    case ContactConstants.RECIEVE_CONTACTS:
      setContacts(action.contacts)
      // We need to call emitChange s othe event listener
      // knows that a change has been made
      ContactStore.emitChange()
      break

    case ContactConstants.RECIEVE_CONTACT:
      setContact(action.contact[0])
      ContactStore.emitChange()
      break

    case ContactConstants.RECIEVE_CONTACT_ERROR:
      setContact(action.message)
      ContactStore.emitChange()
      break

    case ContactConstants.RECIEVE_CONTACTS_ERROR:
      setContact(action.message)
      ContactStore.emitChange()
      break

    default:
  }
})

export default ContactStore
