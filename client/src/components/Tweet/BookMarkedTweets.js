import React, { Component } from 'react';
import { PullDownContent, PullToRefresh, RefreshContent, ReleaseContent } from "react-js-pull-to-refresh";
import '../../css/hometweetlist.css'
import { TweetBody } from '../HomeTweetList/listview';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet, faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { Modal } from "react-bootstrap";
import Tweet from "../Tweet/CreateTweet";
import ViewTweets from "../Tweet/ViewTweets";
import {getBookmarkedTweets} from "../../redux/actions/tweetsActions";
import {connect} from "react-redux";

function mapStateToProps(store) {
    return {
        bookmarkedTweets: store.tweets.bookmarkedTweets,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getBookmarkedTweets: (payload) => dispatch(getBookmarkedTweets(payload))
    };
}

class BookMarkedTweets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            userName: "@sakshimahendru",
            openCommentModal: false
        };
    }

    componentDidMount() {
        const payload = {};
        payload.ownerId = localStorage.getItem("id")
        this.props.getBookmarkedTweets(payload);
    }

    render() {
        console.log("render HomeTweetList");
        return (
            <div class="top-label-bookmark-header">
                <div class="top-label-bookmark">BookMarks</div>
                <div class="top-label-bookmark-username">{this.state.userName}</div>
                <div class="bookmark-tweets-container">
                    <ViewTweets dataFromParent={this.props.bookmarkedTweets} />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookMarkedTweets);

