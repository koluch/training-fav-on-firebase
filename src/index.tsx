import "antd/dist/antd.css";
import "./index.less";
import ReactDOM from "react-dom";
import React from "react";

import App from "./components/App";
import DataAccess from "./DataAccess";

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

ReactDOM.render(<App dataAccess={dataAccess} />, document.getElementById("react"));

