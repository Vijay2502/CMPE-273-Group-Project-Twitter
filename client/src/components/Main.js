import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Sidebar from "./Sidebar/sidebar";
import Lists from "./list";
import Profile from "./Profile/profile";

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" component={Sidebar} />
          <Route path="/profile" component={Profile} />
          <Route exact path="/list" component={Lists} />
        </Switch>
      </div>
    );
  }
}
//Export The Main Component
export default Main;
