import React, { Component } from "react";
import { Route } from "react-router-dom";
import ListPage from "../containers/listPage";
import Profile from "./Profile/profile";
import HomeTweetList from '../components/HomeTweetList/list'
import HomePage from "./HomePage";
import NavPage from "./NavPage/NavPage";
import Login from "./Account/Login";
import SignUp from "./Account/SignUp";
import AnalyticsMain from "./Analytics/AnalyticsMain";
import tweetlist from "./List/tweetlist";
import Chat from "./Chat/chat";

class Main extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={NavPage} />
                <Route exact path="/home" component={HomePage} />
                <Route path="/profile" component={Profile} />
                <Route path="/listtweet" component={tweetlist} />
                {/* <Route exact path="/list" component={ListPage}/> */}
                <Route exact path="/tweetlist" component={HomeTweetList} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                {/*<Route exact path="/analytics" component={AnalyticsMain} />*/}
                <Route path="/analytics" component={AnalyticsMain} />
                <Route exact path="/chat" component={Chat} />
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
