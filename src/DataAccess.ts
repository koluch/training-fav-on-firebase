import { TData } from "./types";
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

export default class DataAccess {
  constructor(firebaseConfig: Object) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
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

  getList(): Promise<TData> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {id: '1', url: 'https://yandex.ru'},
          {id: '2', url: 'https://google.ru'},
        ])
      }, 100 + Math.round(1900 * Math.random()))
    });
  }
}
