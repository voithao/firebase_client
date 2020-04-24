import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations } from 'vuexfire'
import user from '@/store/user/user.module'
import product from '@/store/product/product.module'

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
    product
  }
})
