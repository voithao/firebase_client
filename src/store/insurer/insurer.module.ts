import {VuexModule} from 'vuex-module-decorators'
import {Insurer} from '@/schemas/insurer'
import { firestoreAction } from 'vuexfire'
import { db } from "@/firebaseConfig"
import product from '@/store/insurer/product/product.module'

type InsurerState = {
  insurers: Array<Insurer> | null;
}

export default new VuexModule<InsurerState>({
  namespaced: true,
  state: {
    insurers: []
  },
  mutations: {
  },
  actions: {
    bindInsurers: firestoreAction(({bindFirestoreRef}) => {
      return bindFirestoreRef('insurers', db.collection('insurers'))
    })
  },
  modules: {
    product
  }
});
