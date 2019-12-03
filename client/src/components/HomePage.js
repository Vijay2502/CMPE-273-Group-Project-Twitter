import React, { Component } from 'react';
import '../css/list.css'
import Sidebar from './Sidebar/sidebar'
import HomeTweetList from './HomeTweetList/list'
import Messages from './Messages/messagelist'
import Profile from './Profile/profile'
import List from './List/list'
import Tweet from "./Tweet/CreateTweet";
import GridLayout from 'react-grid-layout';
import Search from '../components/List/search.js'
import CreateList from '../components/List/createlist.js';
import BookMarks from './Tweet/BookMarkedTweets';
import ViewDetailedTweet from './ViewTweetDetails/ViewTweetDetails';
import Settings from './Account/settings'
import { Redirect } from "react-router";


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentScreen: "Home",
            viewDetailedTweetScreenPropId: null
        }
    }

    callbackFunction = (screenName) => {
        let tweetId = document.querySelector("#root > div > div > div > div > div.col-lg-3 > div > div > div > button:nth-child(7)").getAttribute("data-tweet-id");

        this.setState({ currentScreen: screenName, viewDetailedTweetScreenPropId: tweetId })
    };

    render() {
        return (
            <div className="container twitter-container">
                {localStorage.getItem("token") === null || localStorage.getItem('userActive') === 'false' &&
                    <Redirect to={{
                        pathname: "/login"
                    }} />}
                <div className="row" >
                    {/* <div key="a" data-grid={{ x: 0, y: 0, w: 4, h: 11, static: true }}> */}
                    <div className="col-lg-3">
                        <Sidebar parentCallback={this.callbackFunction} />
                    </div>

                    {/* <div key="b" data-grid={{ x: 4, y: 0, w: 4, h: 11, static: true }}> */}
                    <div className="col-lg-7">
                        {this.state.currentScreen === "Home" &&
                            <div class="parent-container col-sm-12">
                                <div class="top-label">Home</div>
                                <div class="top-label-border"></div>
                                <div><Tweet /></div>
                                <div class="tweet-container-border"></div>
                                <div class="home-tweet-container"><HomeTweetList /></div>
                            </div>}

                        {this.state.currentScreen === "Profile" &&
                            <Profile />}

                        {this.state.currentScreen === "Messages" &&
                            <Messages />}

                        {this.state.currentScreen === "Bookmarks" &&
                            <div class="parent-container-bookmark col-sm-12" ><BookMarks /></div>
                        }

                        {this.state.currentScreen === "Settings" &&
                            <Settings />
                        }



                        {this.state.currentScreen === "List" &&
                            <div class="parent-container-list col-sm-12">
                                <div class="top-label-list-header">
                                    <div class="top-label-list">List</div>
                                    <div><CreateList /></div>
                                </div>
                                <List />
                            </div>
                        }

                        {this.state.currentScreen === "ViewDetailedTweet" && this.state.viewDetailedTweetScreenPropId &&
                            (<div class="parent-container-bookmark col-sm-12" ><ViewDetailedTweet tweetId={this.state.viewDetailedTweetScreenPropId} /></div>)
                        }

                    </div>

                    {/* <div key="c" data-grid={{ x: 8, y: 0, w: 4, h: 11, static: true }}> */}
                    <div className="col-lg-2">
                        <Search />
                    </div>

                </div>
            </div>
        );
    }
}

export default HomePage;

