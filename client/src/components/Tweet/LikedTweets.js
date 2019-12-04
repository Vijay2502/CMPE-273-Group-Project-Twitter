import React, { Component } from 'react';
import '../../css/hometweetlist.css'
import ViewTweets from "./ViewTweets";
import { getLikedTweets } from "../../redux/actions/tweetsActions";
import { connect } from "react-redux";

function mapStateToProps(store) {
    return {
        bookmarkedTweets: store.tweets.bookmarkedTweets,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getLikedTweets: (payload) => dispatch(getLikedTweets(payload))
    };
}

class LikedTweets extends Component {
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
        this.props.getLikedTweets(payload);
    }

    render() {
        console.log("render HomeTweetList");
        return (
            <div class="top-label-bookmark-header">
                <div class="top-label-bookmark">Liked tweets</div>
                <div class="bookmark-tweets-container">
                    <ViewTweets dataFromParent={this.props.bookmarkedTweets} />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LikedTweets);

