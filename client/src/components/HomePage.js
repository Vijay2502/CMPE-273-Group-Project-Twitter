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


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentScreen: "Home"
        }
    }

    callbackFunction = (screenName) => {
        this.setState({ currentScreen: screenName })
    };

    render() {
        return (
            <div className="container twitter-container">
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

                        {this.state.currentScreen === "List" &&
                        <div class="parent-container-list col-sm-12">
                            <div class="top-label-list-header">
                                <div class="top-label-list">List</div>
                                <div><CreateList /></div>
                            </div>
                            <List />
                        </div>
                        }

                        {this.state.currentScreen === "ViewDetailedTweet" &&
                        <div class="parent-container-bookmark col-sm-12" ><ViewDetailedTweet /></div>
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

