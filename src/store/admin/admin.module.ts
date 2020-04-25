import {VuexModule} from 'vuex-module-decorators'
import { firestoreAction } from 'vuexfire'
import { firestore } from 'firebase'
import { db } from "@/firebaseConfig"
import {Schema} from '@/schemas/schemas'

type AdminState = {
  data: Array<Schema> | null;
}

type AdminDataPayload = {
  collection: string;
  id: string;
  doc: firestore.DocumentReference<string> | null;
}

export default new VuexModule<AdminState>({
  namespaced: true,
  state: {
    data: null
  },
  mutations: {
  },
  actions: {
    bindCustomData: firestoreAction(({bindFirestoreRef}, path: AdminDataPayload) => {
      return bindFirestoreRef('data', db.collection(path.collection).doc(path.id)) 
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
