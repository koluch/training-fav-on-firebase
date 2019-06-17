import ReactDOM from "react-dom";
import React from "react";
import * as firebaseui from "firebaseui";
import * as firebase from "firebase";
import App from "./components/App";
import DataAccess from "./DataAccess";

// Include global css
import "antd/dist/antd.css";
import "firebaseui/dist/firebaseui.css";
import "./index.less";

// App mount points
const REACT_MOUNT_ID = "react";
const FIREBASE_AUTH_UI_MOUNT_ID = "firebaseui-auth-container";

// Init data access
const firebaseConfig = {
  apiKey: "AIzaSyBntk4o71odxx3Pj6m3htY8UuOlF8jMLlI",
  authDomain: "ru-koluch-favs.firebaseapp.com",
  databaseURL: "https://ru-koluch-favs.firebaseio.com",
  projectId: "ru-koluch-favs",
  storageBucket: "ru-koluch-favs.appspot.com",
  messagingSenderId: "131847637134",
  appId: "1:131847637134:web:a31646127a79a875"
};
const dataAccess = new DataAccess(firebaseConfig);

// Init FirebaseUI
const uiConfig = {
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
    // {
    //   provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //   signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
    // }
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ]
};
const auth = firebase.auth();
const ui = new firebaseui.auth.AuthUI(auth);

// Init auth
function onAuthChange(user: firebase.User | null) {
  const isAuth = !!user;
  document.body.classList.toggle("auth", isAuth);
  if (isAuth) {
    ReactDOM.render(
      <App
        onSignOut={() => {
          auth.signOut();
        }}
        dataAccess={dataAccess}
      />,
      document.getElementById(REACT_MOUNT_ID)
    );
    ui.reset();
  } else {
    ReactDOM.unmountComponentAtNode(document.getElementById(REACT_MOUNT_ID));
    ui.start(`#${FIREBASE_AUTH_UI_MOUNT_ID}`, uiConfig);
  }
}

function onAuthChangeFailed(error: any) {
  // todo: handle properly
  console.log(error);
}

auth.onAuthStateChanged(onAuthChange, onAuthChangeFailed);
