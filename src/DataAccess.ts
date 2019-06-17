import { TData, TNewItem, User } from "./types";
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const COLLECTION_NAME = "links";

export default class DataAccess {
  db: firebase.firestore.Firestore;
  query: firebase.firestore.Query;

  constructor(user: User) {
    this.db = firebase.firestore();
    this.query = this.db
      .collection(COLLECTION_NAME)
      .where("uid", "==", user.id)
      .orderBy("created", "desc")
      .limit(5);
  }

  subscribe(
    listener: (data: TData) => void,
    errorListener: (error: string) => void
  ): () => void {
    const unsubscribe = this.query.onSnapshot(
      (querySnapshot: firebase.firestore.QuerySnapshot) => {
        const data: TData = querySnapshot.docs.map(
          (doc: firebase.firestore.QueryDocumentSnapshot) => {
            const documentData = doc.data();
            return {
              id: doc.id,
              uid: documentData.uid,
              url: documentData.url,
              tags: documentData.tags
            };
          }
        );
        listener(data);
      },
      e => {
        errorListener(e.message);
      }
    );
    return unsubscribe;
  }

  async add(item: TNewItem): Promise<void> {
    await this.db.collection(COLLECTION_NAME).add(item);
  }
}
