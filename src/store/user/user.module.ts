import Vue from 'vue'
import { User } from 'firebase'
import {VuexModule} from 'vuex-module-decorators'

type UserState = {
  user: User | null;
}

export default new VuexModule<UserState>({
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    updateUser (state, { user }) {
      Vue.set(state, 'user', user)
    }
  }
});
