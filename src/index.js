import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase";
import { Provider } from "react-redux";
import store from "./Store";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSogXls1wc8UxrKBEWalHcaw5GW8CElig",
  authDomain: "my-project-1587056022540.firebaseapp.com",
  databaseURL: "https://my-project-1587056022540.firebaseio.com",
  projectId: "my-project-1587056022540",
  storageBucket: "my-project-1587056022540.appspot.com",
  messagingSenderId: "90249910005",
  appId: "1:90249910005:web:a7e54263c85cb355e257bc",
  measurementId: "G-8J2BJB633Z",
};

firebase.initializeApp(firebaseConfig);

window.store = store;
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
