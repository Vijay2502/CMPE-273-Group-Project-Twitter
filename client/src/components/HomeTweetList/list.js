import React, { Component } from 'react';
import '../../css/hometweetlist.css'
import { TweetBody } from './listview.js'
import ViewTweets from "../Tweet/ViewTweets";
import {connect} from "react-redux";
import {getTweetsById, likeTweet, retweetTweet, replyTweet} from "../../redux/actions/tweetsActions";

// import Search from './search.js'

function mapStateToProps(store) {
    return {
        tweets: store.tweets.userTweets
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTweets: (payload) => dispatch(getTweetsById(payload)),
        likeTweet: (payload) => dispatch(likeTweet(payload)),
        retweetTweet: (payload) => dispatch(retweetTweet(payload)),
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
        this.likeTweet = this.likeTweet.bind(this)
        this.retweetTweet = this.retweetTweet.bind(this)
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

    // this.props.likeTweetCallback(this.props.data.tweetData, this.props.data.owner,
    //                                 this.props.data.userId, this.props.data.tweetId)
    retweetTweet(tweetData, owner, retweetingUserId, tweetId) {
        console.log("retweetTweet")
        console.log("tweetId", tweetId)

        const retweet = {};
        retweet.isRetweet = true;
        retweet.tweetId = tweetId;

        const payload = {};
        payload.tweetId = tweetId;
        payload.data = tweetData;
        payload.owner = owner;
        payload.ownerId = retweetingUserId;

        this.props.retweetTweet(payload);
    }

    likeTweet(tweetId, userId) {
        console.log("likeTweet")
        console.log("tweetId", tweetId)
        console.log("userId", userId)

        const payload = {};
        payload.tweetId = tweetId;
        payload.userId = userId;

        this.props.likeTweet(payload);
    }

    // replyTweet(data, userId) {
    //     console.log("replyTweet")
    //     console.log("data", data)
    //     console.log("userId", userId)
    //
    //     const payload = {};
    //     payload.data = data;
    //     payload.ownerId = userId;
    //
    //     this.props.likeTweet(payload);
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
                <ViewTweets dataFromParent={this.props.tweets}
                            likeTweetCallback={this.likeTweet}
                            retweetTweetCallback={this.retweetTweet}/>
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

