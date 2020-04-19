import firebase from 'firebase/app'
import Vue from 'vue'
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
const currentUser = auth.currentUser

// For prototyping we sign in anonymously
// auth.signInAnonymously()

Vue.prototype.$auth = {
  login: async (username: string, pass: string) => {
    return await auth.signInWithEmailAndPassword(username, pass)
  },
  logout: async () => {
    await auth.signOut()
  }
}

auth.onAuthStateChanged(user => {
  store.commit('updateUser', { user })
})

const settings = {
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const productsCollection = db.collection('products')

export {
  db,
  auth,
  currentUser,
  usersCollection,
  productsCollection,
}
