import Vue from 'vue'
import { firestoreAction } from 'vuexfire'
import { db } from "@/firebaseConfig"
import {VuexModule} from 'vuex-module-decorators'

type ClassifierState = {
  productTypes: string[];
}

export default new VuexModule<ClassifierState>({
  namespaced: true,
  state: {
    productTypes: []
  },
  mutations: {
    setProductTypes(state, data) {
      Vue.set(state, 'productTypes', data);
    }
  },
  actions: {
    getProductTypes: firestoreAction(async ({commit}, id: string) => {
      db.collection('classifier')
        .where('name', '==', id).get()
        .then(snapshot => {
          if (!snapshot.empty && (snapshot.size === 1))
          snapshot.forEach(doc => {
            commit('setProductTypes', doc.data().values);
          })
        });
    })
  }
});
