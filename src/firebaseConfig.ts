import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import store from './store'

// firebase init goes here
import { config } from './config'

// Get a Firestore instance
const db = firebase
  .initializeApp(config)
  .firestore()
const auth = firebase.auth()

// For prototyping we sign in anonymously
// auth.signInAnonymously()

auth.onAuthStateChanged(user => {
  store.commit('user/updateUser', { user })
})

const settings = {
}
db.settings(settings)

export {
  db,
  auth
}
