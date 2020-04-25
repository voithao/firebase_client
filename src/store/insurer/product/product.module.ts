import {VuexModule} from 'vuex-module-decorators'
import { firestoreAction } from 'vuexfire'
import { db } from "@/firebaseConfig"
import { Classifier } from '@/schemas/classifier'
import {ProductFormDef} from '@/schemas/insurer/products'

type ProductState = {
  fieldTypes: Array<Classifier> | null;
  product: ProductFormDef | null;
}

export default new VuexModule<ProductState>({
  namespaced: true,
  state: {
    fieldTypes: [],
    product: null
  },
  mutations: {
  },
  actions: {
    bindFieldTypes: firestoreAction(({bindFirestoreRef}) => {
      return bindFirestoreRef('fieldTypes', db.collection('classifier').where('name', '==', 'fieldTypes'))
    }),
    bindInsurerProduct: firestoreAction(({bindFirestoreRef}, id: string) => {
      return bindFirestoreRef('product', db.collection('/insurers/sLZN4sLaKZvGC9OYTFpe/products').doc(id))
    }),
    addProduct: firestoreAction(() => {
      return db.collection('products')
        .add({ name: 'new product name'})
    })
  }
});
