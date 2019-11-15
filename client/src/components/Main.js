import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Sidebar from "./Sidebar/sidebar";
import Lists from "./list";
import Profile from "./Profile/profile";
import HomeTweetList from '../components/HomeTweetList/list'
import HomePage from "./HomePage";

class Main extends Component {
  render() {
    return (
      <div>
            <Route path="/" component={HomePage} />
          <Route path="/profile" component={Profile} />
            <Route exact path="/list" component={Lists} />
            <Route exact path="/tweetlist" component={HomeTweetList} />
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
