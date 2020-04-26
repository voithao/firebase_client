import {VuexModule} from 'vuex-module-decorators'
import { firestoreAction } from 'vuexfire'
import { db } from "@/firebaseConfig"
import { Classifier } from '@/schemas/classifier/classifier'
import {ProductFormDef} from '@/schemas/insurer/products'

type ProductState = {
  fieldTypes: Array<Classifier> | null;
  products: Array<ProductFormDef>;
  product: ProductFormDef | null;
}

export default new VuexModule<ProductState>({
  namespaced: true,
  state: {
    fieldTypes: [],
    products: [],
    product: null
  },
  mutations: {
  },
  actions: {
    bindFieldTypes: firestoreAction(({bindFirestoreRef}) => {
      return bindFirestoreRef('fieldTypes', db.collection('classifier').where('name', '==', 'fieldTypes'))
    }),
    bindInsurerProducts: firestoreAction(({bindFirestoreRef}) => {
      return bindFirestoreRef('products', db.collection('/insurers/sLZN4sLaKZvGC9OYTFpe/products'))
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
