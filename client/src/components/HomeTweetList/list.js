import React, { Component } from 'react';
import { PullDownContent, PullToRefresh, RefreshContent, ReleaseContent } from "react-js-pull-to-refresh";
import '../../css/hometweetlist.css'
import { TweetBody } from './listview.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet, faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { Modal } from "react-bootstrap";
import Tweet from "../Tweet/CreateTweet";
import ViewTweets from "../Tweet/ViewTweets";
import {connect} from "react-redux";
import {getTweetsById} from "../../redux/actions/tweetsActions";

// import Search from './search.js'

function mapStateToProps(store) {
    return {
        tweets: store.tweets.userTweets
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTweets: (payload) => dispatch(getTweetsById(payload))
    };
}

class HomeTweetList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            openCommentModal: false
        };

        this.handleRefresh = this.handleRefresh.bind(this);
        this.getUser = this.getUser.bind(this)
    }

    handleRefresh() {
        //dispatch
        return new Promise((resolve) => {
            this.getUser()
        });
    }

    componentDidMount() {
        const payload = {};
        payload.user_id = localStorage.getItem("id")
        this.props.getTweets(payload);
    }

    // getUser() {
    //     fetch('https://randomuser.me/api/')
    //         .then(response => {
    //             if (response.ok) return response.json();
    //             throw new Error('Request failed.');
    //         })
    //         .then(data => {
    //             this.setState({
    //                 users: [
    //                     {
    //                         name: data.results[0].name,
    //                         image: data.results[0].picture.medium,
    //                         tweet: data.results[0].email,
    //                     },
    //                     ...this.state.users,
    //                 ]
    //             });
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }

    getUser() {
        fetch('https://randomuser.me/api/')
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('Request failed.');
            })
            .then(data => {
                this.setState({
                    users: [
                        {
                            name: data.results[0].name,
                            image: data.results[0].picture.medium,
                            tweet: data.results[0].email,
                        },
                        ...this.state.users,
                    ]
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        console.log("render HomeTweetList");
        return (
            <div>
                {/*<ViewTweets dataFromParent={this.state.users} />*/}
                <ViewTweets dataFromParent={this.props.tweets} />
            </div>
        );
    }
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    reply: {
        //alignItems: "left",
    },
    retweet: {
        //alignItems: "center",
    },
    like: {
        //alignItems: "center",
    },
    share: {
        //alignItems: "right",
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeTweetList);

