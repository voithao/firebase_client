import Vue from 'vue'
import { firestoreAction } from 'vuexfire'
import { db } from "@/firebaseConfig"
import {VuexModule} from 'vuex-module-decorators'
import {Classifier} from '@/schemas/classifier/classifier'

type ClassifierState = {
  classifierHouseConstruction: Classifier | null;
  classifierHouseType: Classifier | null;
  classifierProductType: Classifier | null;
}

export default new VuexModule<ClassifierState>({
  namespaced: true,
  state: {
    classifierHouseConstruction: null,
    classifierHouseType: null,
    classifierProductType: null
  },
  mutations: {
    setClassifier(state, data) {
      Vue.set(state, 'classifier' + data.name, data.values);
    }
  },
  actions: {
    getClassifier: firestoreAction(({bindFirestoreRef}, id: string) => {
      return bindFirestoreRef('classifier' + id, db.collection('classifier').where('name', '==', id))
    })
  }
});
