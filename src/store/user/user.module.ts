import Vue from 'vue'
import { firestoreAction } from 'vuexfire'
import { db } from "@/firebaseConfig"
import { User } from 'firebase'
import {VuexModule} from 'vuex-module-decorators'
import {Policy} from '@/schemas/user/policy'
import {FormFieldDefType} from '@/schemas/insurer/products'
import {UserProfile} from '@/schemas/user'

type UserState = {
  user: User | null;
  profile: UserProfile | null;
  policy: Policy | null;
}

type FormFieldPayload = {
  form: string;
  field: string;
  value: FormFieldDefType;
}

export default new VuexModule<UserState>({
  namespaced: true,
  state: {
    user: null,
    profile: null,
    policy: null
  },
  mutations: {
    updateUser (state, { user }) {
      Vue.set(state, 'user', user)
    },
    setPolicy(state: UserState, object) {
      state.policy = object
    },
    setPolicyField(state: UserState, payload: FormFieldPayload) {
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
    bindUserProfile: firestoreAction(({bindFirestoreRef, state}) => {
      if (state.user) {
        return bindFirestoreRef('profile', db.collection('users').doc(state.user.uid))
      }
    }),
    getPolicy: firestoreAction(async (context, id: string) => {
      db.collection('policies').doc(id).get().then(snapshot => {
        const policy = snapshot.data()
        context.commit('setPolicy', policy)
      })
    }),
    savePolicy: firestoreAction(({state}, id: string) => {
      if (state.policy) {
        return db
          .collection('policies')
          .doc(id)
          .set(Object.assign({}, state.policy), { merge: true });
      }
    })
  }
});
