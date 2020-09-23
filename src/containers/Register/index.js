import React, { useState } from "react";
import "./style.css";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { signup } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const registerUser = (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    dispatch(signup(user));
  };

  if (auth.authenticated) {
    return <Redirect to={`/`} />;
  }

  return (
    <Layout>
      <div className="registercontainer">
        <Card>
          <form onSubmit={registerUser}>
            <h3> Sign Up</h3>
            <input
              type="text"
              value={firstName}
              name="firstName"
              placeholder="FirstName"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              value={lastName}
              name="lastName"
              placeholder="lastName"
              onChange={(e) => setLastName(e.target.value)}
            />
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
              <button>Register</button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};
export default Register;
