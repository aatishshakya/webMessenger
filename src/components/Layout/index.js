import React from "react";
import "./style.css";
import Header from "../Header";
const Layout = (props) => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};
export default Layout;
