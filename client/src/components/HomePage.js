import React, { Component } from 'react';
import '../css/list.css'
import Sidebar from './Sidebar/sidebar'
import HomeTweetList from './HomeTweetList/list'
import Messages from './Messages/messagelist'
import Profile from './Profile/profile'
import List from './List/list'
import Tweet from "./Tweet/CreateTweet";
import GridLayout from 'react-grid-layout';

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
            <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
                <div key="a" data-grid={{ x: 0, y: 0, w: 5, h: 2, static: true }}>
                    <Sidebar parentCallback={this.callbackFunction} />
                </div>


                <div key="b" data-grid={{ x: 10, y: 0, w: 8, h: 2, static: true }}>
                    {this.state.currentScreen === "Home" &&
                        <div>
                            <h2>Home</h2>
                            <Tweet />
                            <HomeTweetList />
                        </div>}

                    {this.state.currentScreen === "Profile" &&
                        <Profile />}

                    {this.state.currentScreen === "Messages" &&
                        <Messages />}

                    {this.state.currentScreen === "List" &&
                        <List />}

                </div>


            </GridLayout>
        );
    }
}

export default HomePage;

