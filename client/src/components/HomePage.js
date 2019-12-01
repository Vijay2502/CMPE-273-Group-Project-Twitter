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
            <GridLayout className="layout" cols={12} rowHeight={10} width={1000}>
                <div key="a" data-grid={{ x: 0, y: 0, w: 5, h: 0, static: true }}>
                    <Sidebar parentCallback={this.callbackFunction} />
                </div>

                <div key="b" data-grid={{ x: 10, y: 0, w: 8, h: 0, static: true }}>
                    {this.state.currentScreen === "Home" &&
                        <div class="parent-container col-sm-10">
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
                        <div class="parent-container-bookmark col-sm-10" ><BookMarks /></div>
                    }

                    {this.state.currentScreen === "List" &&
                        <div class="parent-container-list col-sm-10">
                            <div class="top-label-list-header">
                                <div class="top-label-list">List</div>
                                <div><CreateList /></div>
                            </div>
                            <List />
                        </div>
                    }

                    {this.state.currentScreen === "ViewDetailedTweet" &&
                        <div class="parent-container-bookmark col-sm-10" ><ViewDetailedTweet /></div>
                    }

                </div>
                <div key="c" data-grid={{ x: 4, y: 0, w: 6, h: 0, static: true }}><Search /></div>

            </GridLayout>
        );
    }
}

export default HomePage;

