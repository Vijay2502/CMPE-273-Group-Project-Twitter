import React, { Component } from "react";
import { Route } from "react-router-dom";
import Sidebar from "./Sidebar/sidebar";

class Main extends Component {
  render() {
    return <div>{<Route path="/" component={Sidebar} />}</div>;
  }
}
//Export The Main Component
export default Main;
