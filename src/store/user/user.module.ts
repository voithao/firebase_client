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
    bindUserProfile: firestoreAction(async ({bindFirestoreRef, state}) => {
      if (state.user) {
        await bindFirestoreRef('profile', db.collection('users').doc(state.user.uid))
        if (!state.profile) {
          state.profile = {
            cars: [],
            firstname: '',
            surename: ''
          }
        }
      }
    }),
    updateUserProfile: firestoreAction(async ({ state, commit }) => {
      if (state.user && state.profile) {
        try {
          await db
            .collection('users')
            .doc(state.user.uid)
            .set(state.profile, {merge: true})
          return commit('setError', '')
        } catch (error) {
          return commit('setError', error)
        }
      }
    })
  },
  modules: {
    policy
  }
});
