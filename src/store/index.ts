import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '@/firebaseConfig'
import { Classifier } from '@/schemas/classifier'
import {Insurer} from '@/schemas/insurer'
import {ProductFormDef, FormFieldDefType} from '@/schemas/product'
import {Policy, PolicyDataBlock} from '@/schemas/policy'

Vue.use(Vuex)

type RootState = {
  fieldTypes: Array<Classifier> | null;
  insurers: Array<Insurer> | null;
  product: ProductFormDef | null;
  policy: Policy | null;
}

type FormFieldPayload = {
  form: string;
  field: string;
  value: FormFieldDefType;
}

export default new Vuex.Store<RootState>({
  state: {
    fieldTypes: [],
    insurers: [],
    product: null,
    policy: null
  },
  mutations: {
    ...vuexfireMutations,
    setPolicy(state: RootState, object) {
      state.policy = object
    },
    setPolicyField(state: RootState, payload: FormFieldPayload) {
      if (!state.policy) {
        const fields: Record<string, FormFieldDefType> = {}
        fields[payload.field] = payload.value
        const data: Record<string, PolicyDataBlock> = {}
        data[payload.form] = {
          fields
        }
      } else {
        state.policy.data[payload.form].fields[payload.field] = payload.value
      }
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
    }),
    savePolicy: firestoreAction(({state}, id: string) => {
      if (state.policy) {
        return db
          .collection('policies')
          .doc(id)
          .set(state.policy, { merge: true });
      }
    })
  },
  modules: {
  }
})
