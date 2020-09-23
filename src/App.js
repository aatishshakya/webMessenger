import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import PrivateRoute from "./components/PrivateRoute.js";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedInUser } from "./actions/index.js";
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isLoggedInUser());
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <PrivateRoute path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Register} />
      </Router>
    </div>
  );
}

export default App;
