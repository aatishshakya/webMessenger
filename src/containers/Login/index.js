import React, { useState } from "react";
import "./style.css";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { useDispatch, useSelector } from "react-redux";
import { signin, isLoggedInUser } from "../../actions";
import { Redirect } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const userLogin = (e) => {
    e.preventDefault();

    if (email == "") {
      alert("email is required");
      return;
    }
    if (password == "") {
      alert("password is empty");
      return;
    }
    dispatch(signin({ email, password }));
  };
  if (auth.authenticated) {
    return <Redirect to={`/`} />;
  }

  return (
    <Layout>
      <div className="logincontainer">
        <Card>
          <form onSubmit={userLogin}>
            <input
              type="text"
              value={email}
              name="email"
              placeholder="Type Your Email Here"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Typr Your Password Here"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              <button>login</button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};
export default Login;
