import { TData, TNewItem } from "./types";
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

export default class DataAccess {
  db: firebase.firestore.Firestore;
  query: firebase.firestore.Query;

  constructor(firebaseConfig: Object) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    this.db = firebase.firestore();
    this.query = this.db.collection("links").orderBy("created", "desc");

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

  subscribe(listener: (data: TData) => void, errorListener: (error: string) => void): () => void {
    const unsubscribe = this.query.onSnapshot((querySnapshot: firebase.firestore.QuerySnapshot) => {
      const data: TData = querySnapshot.docs.map((doc: firebase.firestore.QueryDocumentSnapshot) => {
        let documentData = doc.data();
        return {
          id: doc.id,
          url: documentData.url
        };
      });
      listener(data);
    }, (e) => {
      errorListener(e.message);
    });
    return unsubscribe
  }

  async add(item: TNewItem): Promise<void> {
    await this.db.collection("links").add(item);
  }

}
