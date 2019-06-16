import { TData, TItem, TNewItem } from "./types";
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

export default class DataAccess {
  db: firebase.firestore.Firestore;

  constructor(firebaseConfig: Object) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    this.db = firebase.firestore();

    //
    // firebase.auth()
    //   .signInWithEmailAndPassword('koluch@koluch.ru', '123456')
    //   .then((r) => {
    //     console.log("r", r)
    //
    //     const db = firebase.firestore();
    //     db.collection("links").get().then((querySnapshot) => {
    //       querySnapshot.forEach((doc) => {
    //         console.log(`${doc.id} => ${doc.data()}`);
    //       });
    //     });
    //   })
    //   .catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // ...
    //   });
    //
  }

  async add(item: TNewItem): Promise<void> {
    await this.db.collection("links").add(item);
  }

  async getList(): Promise<TData> {
    const querySnapshot = await this.db.collection("links").get();

    return querySnapshot.docs.map((doc) => {
      let documentData = doc.data();
      return {
        id: doc.id,
        url: documentData.url,
      };
    });
  }
}
