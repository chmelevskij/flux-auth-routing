import request from 'superagent/lib/client'
import AuthStore from '../stores/AuthStore'

export default {

  // We want to get a list of all the contacts
  // from the API. This list contains reduced info
  // and will be use in the sidebar
  getContacts: url => {
    return new Promise((resolve, reject) => {
      request
        .get(url)
        .end((err, response) => {
          if (err) reject(err)
          resolve(JSON.parse(response.text))
        })
    })
  },
  // and will be use in the sidebar
  getContact: url => {
    return new Promise((resolve, reject) => {
      request
        .get(url)
        .set('Authorization', `Bearer ${AuthStore.getJwt()}`)
        .end((err, response) => {
          if (err) reject(err)
          resolve(JSON.parse(response.text))
        })
    })
  }
}
