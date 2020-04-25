import Vue from 'vue'
import { firestoreAction } from 'vuexfire'
import { db, auth } from "@/firebaseConfig"
import {VuexModule} from 'vuex-module-decorators'
import {Policy} from '@/schemas/user/policy'
import {FormFieldDefType} from '@/schemas/insurer/products'

type PolicyState = {
  policy: Policy | null;
}

type FormFieldPayload = {
  form: string;
  field: string;
  value: FormFieldDefType;
}

export default new VuexModule<PolicyState>({
  namespaced: true,
  state: {
    policy: null
  },
  mutations: {
    setPolicy(state: PolicyState, object) {
      state.policy = object
    },
    setPolicyField(state: PolicyState, payload: FormFieldPayload) {
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
    getPolicy: firestoreAction(async ({commit}, id: string) => {
      db.collection('users').doc(auth.currentUser?.uid).collection('policies').doc(id).get().then(snapshot => {
        const policy = snapshot.data()
        commit('setPolicy', policy)
      })
    }),
    savePolicy: firestoreAction(({state}, id: string) => {
      if (state.policy) {
        return db.collection('users').doc(auth.currentUser?.uid)
          .collection('policies')
          .doc(id)
          .set(Object.assign({}, state.policy), { merge: true });
      }
    })
  }
});
