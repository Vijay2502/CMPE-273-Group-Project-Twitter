import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Sidebar from "./Sidebar/sidebar";
import Lists from './list';
import HomeTweetList from '../components/HomeTweetList/list'
import HomePage from "./HomePage";
import Login from "./Account/Login";
import Login from "./Account/Login";

class Main extends Component {
  render() {
    return (
      <div>
            <Route path="/" component={HomePage} />
            <Route exact path="/list" component={Lists} />
            <Route exact path="/tweetlist" component={HomeTweetList} />
          <Route exact path="/login" component={Login} />
        {/*<Switch>*/}
        {/*  <Route path="/" component={Sidebar} />*/}
        {/*  <Route exact path="/list" component={Lists} />*/}
        {/*  <Route exact path="/tweetlist" component={HomeTweetList} />*/}
        {/*</Switch>*/}
      </div>
    );
  }
}
//Export The Main Component
export default Main;
