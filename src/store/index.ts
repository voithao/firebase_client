import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '@/firebaseConfig'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fieldTypes: [],
    insurers: [],
    product: null,
    policy: null
  },
  mutations: {
    ...vuexfireMutations,
    setPolicy(state: any, object) {
      state.policy = object
    },
    setPolicyField(state: any, payload: any) {
      state.policy.data[payload.form].fields[payload.field] = payload.value
    }
  },
  actions: {
    bindInsurers: firestoreAction(({bindFirestoreRef}) => {
      return bindFirestoreRef('insurers', db.collection('insurers'))
    }),
    bindFieldTypes: firestoreAction(({bindFirestoreRef}) => {
      return bindFirestoreRef('fieldTypes', db.collection('classifier').where('name', '==', 'fieldTypes'))
    }),
    bindInsurerProduct: firestoreAction(({bindFirestoreRef}, id: string) => {
      return bindFirestoreRef('product', db.collection('products').doc(id))
    }),
    getPolicy: firestoreAction(async (context, id: string) => {
      db.collection('policies').doc(id).get().then(snapshot => {
        const policy = snapshot.data()
        context.commit('setPolicy', policy)
      })
    }),
    addProduct: firestoreAction(() => {
      return db.collection('products')
        .add({ name: 'new product name'})
    }),
    addPolicy: firestoreAction(() => {
      return db.collection('policies')
        .add({insurer: 'sLZN4sLaKZvGC9OYTFpe', number: 'IIDL234-2', code: 'TT01', description: 'MTPLLT',
          data: { base: {fields: {from: null, period: null}}, detail: {fields:{plate: 'plateno'}}}}
        );
    })
  },
  modules: {
  }
})
