import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { firestore } from 'firebase'
import { db } from '@/firebaseConfig'
import { Classifier } from '@/schemas/classifier'
import {Insurer} from '@/schemas/insurer'
import {ProductFormDef, FormFieldDefType} from '@/schemas/product'
import {Policy} from '@/schemas/policy'
import {Schema} from '@/schemas/schemas'

Vue.use(Vuex)

type RootState = {
  fieldTypes: Array<Classifier> | null;
  insurers: Array<Insurer> | null;
  product: ProductFormDef | null;
  policy: Policy | null;
  data: Array<Schema> | null;
}

type FormFieldPayload = {
  form: string;
  field: string;
  value: FormFieldDefType;
}

type AdminDataPayload = {
  collection: string;
  id: string;
  doc: firestore.DocumentReference<string> | null;
}

export default new Vuex.Store<RootState>({
  state: {
    fieldTypes: [],
    insurers: [],
    product: null,
    policy: null,
    data: null
  },
  mutations: {
    ...vuexfireMutations,
    setPolicy(state: RootState, object) {
      state.policy = object
    },
    setPolicyField(state: RootState, payload: FormFieldPayload) {
      if (!state.policy) {
        state.policy = new Policy()
      }
      if (!state.policy.data[payload.form]) {
        const fields: Record<string, FormFieldDefType> = {}
        fields[payload.field] = payload.value
        Vue.set(state.policy.data, payload.form, { fields })
      }
      Vue.set(state.policy.data[payload.form].fields, payload.field, payload.value)
    }
  },
  actions: {
    bindCustomData: firestoreAction(({bindFirestoreRef}, path: AdminDataPayload) => {
      return bindFirestoreRef('data', db.collection(path.collection).doc(path.id)) 
    }),
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
    }),
    savePolicy: firestoreAction(({state}, id: string) => {
      if (state.policy) {
        return db
          .collection('policies')
          .doc(id)
          .set(Object.assign({}, state.policy), { merge: true });
      }
    }),
    saveDoc: firestoreAction(async (...args ) => {
      const payload: AdminDataPayload = args[1]
      if (payload.doc) {
        if (payload.id === "") {
          return await db
            .collection(payload.collection)
            .add(payload.doc);
        } else {
          return await db
            .collection(payload.collection)
            .doc(payload.id)
            .set(payload.doc, { merge: true });
        }
      }
    })
  },
  modules: {
  }
})
