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

let currentUser: firebase.User | null = null

auth.onAuthStateChanged(async user => {
  currentUser = user
  store.commit('user/updateUser', { user })
  store.dispatch('user/bindUserProfile')
  if (currentUser) {
    store.dispatch('user/policy/bindPolicies')
  }
})

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    if (currentUser) {
      resolve(currentUser)
    }
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}

const settings = {
}
db.settings(settings)

export {
  db,
  auth,
  getCurrentUser
}
