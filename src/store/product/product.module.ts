import {VuexModule} from 'vuex-module-decorators'
import { firestoreAction } from 'vuexfire'
import { firestore } from 'firebase'
import { db } from "@/firebaseConfig"
import {Schema} from '@/schemas/schemas'
import { Classifier } from '@/schemas/classifier'
import {Insurer} from '@/schemas/insurer'
import {ProductFormDef} from '@/schemas/insurer/products'

type ProductState = {
  fieldTypes: Array<Classifier> | null;
  insurers: Array<Insurer> | null;
  product: ProductFormDef | null;
  data: Array<Schema> | null;
}

type AdminDataPayload = {
  collection: string;
  id: string;
  doc: firestore.DocumentReference<string> | null;
}

export default new VuexModule<ProductState>({
  namespaced: true,
  state: {
    fieldTypes: [],
    insurers: [],
    product: null,
    data: null
  },
  mutations: {
  },
  actions: {
    bindCustomData: firestoreAction(({bindFirestoreRef}, path: AdminDataPayload) => {
      return bindFirestoreRef('data', db.collection(path.collection).doc(path.id)) 
    }),
    bindInsurers: firestoreAction(({bindFirestoreRef}) => {
      return bindFirestoreRef('insurers', db.collection('insurers'))
    }),
    bindFieldTypes: firestoreAction(({bindFirestoreRef}) => {
      return bindFirestoreRef('fieldTypes', db.collection('classifier').where('name', '==', 'fieldTypes'))
    }),
    bindInsurerProduct: firestoreAction(({bindFirestoreRef}, id: string) => {
      return bindFirestoreRef('product', db.collection('/insurers/sLZN4sLaKZvGC9OYTFpe/products').doc(id))
    }),
    addProduct: firestoreAction(() => {
      return db.collection('products')
        .add({ name: 'new product name'})
    }),
    saveDoc: firestoreAction(async (...args ) => {
      const payload: AdminDataPayload = args[1]
      if (payload.doc) {
        if (payload.id === "") {
          return await db
            .collection(payload.collection)
            .add(payload.doc);
        } else {
          return await db
            .collection(payload.collection)
            .doc(payload.id)
            .set(payload.doc, { merge: true });
        }
      }
    })
  }
});
