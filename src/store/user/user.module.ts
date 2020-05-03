import Vue from 'vue'
import { firestoreAction } from 'vuexfire'
import { db } from "@/firebaseConfig"
import { User } from 'firebase'
import {VuexModule} from 'vuex-module-decorators'
import {FormFieldDefType} from '@/schemas/insurer/products'
import {UserProfile} from '@/schemas/user'
import policy from '@/store/user/policy/policy.module'

type UserState = {
  user: User | null;
  profile: UserProfile | null;
  error: string;
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
    error: ''
  },
  mutations: {
    updateUser (state, { user }) {
      Vue.set(state, 'user', user)
    },
    setError (state, err) {
      state.error = err
    }
  },
  actions: {
    bindUserProfile: firestoreAction(({bindFirestoreRef, state}) => {
      if (state.user) {
        return bindFirestoreRef('profile', db.collection('users').doc(state.user.uid))
      }
    }),
    updateUserProfile: firestoreAction(({ state, commit }) => {
      if (state.user && state.profile) {
        return db
          .collection('users')
          .doc(state.user.uid)
          .set(state.profile, {merge: true})
          .catch((err) => {
            commit('setError', err)
          })
          .then(() => {
            commit('setError', '')
          })
      }
    })
  },
  modules: {
    policy
  }
});
