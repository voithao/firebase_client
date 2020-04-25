import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations } from 'vuexfire'
import user from '@/store/user/user.module'
import insurer from '@/store/insurer/insurer.module'
import admin from '@/store/admin/admin.module'
import classifier from '@/store/classifier/classifier.module'

Vue.use(Vuex)

type RootState = {
}

export default new Vuex.Store<RootState>({
  state: {
  },
  mutations: {
    ...vuexfireMutations,
  },
  actions: {
  },
  modules: {
    user,
    insurer,
    admin,
    classifier
  }
})
