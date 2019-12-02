import React, { Component } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faRetweet, faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { PullDownContent, PullToRefresh, RefreshContent, ReleaseContent } from "react-js-pull-to-refresh";
import TweetBody from "../HomeTweetList/listview";
import TweetButtons from "../Tweet/TweetButtons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import CreateTweet from "./CreateTweet";

class ViewTweets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isOpenCommentModal: false
        };
    }

    openCommentModal = e => {
        this.setState({ isOpenCommentModal: true });
    };

    closeCommentModal = e => {
        this.setState({ isOpenCommentModal: false });
    };

    render() {
        console.log("render HomeTweetList");
        return (
            <PullToRefresh
                pullDownContent={<PullDownContent />}
                releaseContent={<ReleaseContent />}
                refreshContent={<RefreshContent />}
                pullDownThreshold={2}
                triggerHeight={50}>
                <div className="main-body">
                    {console.log("this.props.dataFromParent123", this.props.dataFromParent)}
                    {this.props.dataFromParent.map((tweet, index) => {
                        console.log("tweet" + index)
                        console.log(tweet)
                        let name = tweet.owner !== undefined ? `${tweet.owner.firstName} ${tweet.owner.lastName}` : "";
                        let handle = `@${tweet.owner.username}`;
                        let image = tweet.image;
                        let tweetText = tweet.data.text;

                        const buttonData = {};
                        buttonData.tweetId = tweet.id;
                        buttonData.userId = tweet.ownerId;
                        buttonData.retweetCount = tweet.retweetCount;
                        buttonData.likes = tweet.likes;
                        buttonData.replyCount = tweet.replyCount;
                        buttonData.tweetData = tweet.data;

                        const owner = {};
                        owner["firstName"] = localStorage.getItem("firstName");
                        owner["lastName"] = localStorage.getItem("lastName");
                        owner["username"] = localStorage.getItem("username");
                        owner["image"] = "";

                        buttonData.owner = owner;
                        buttonData.retweetingUserId = localStorage.getItem("id");

                        return (
                            <div>
                                <TweetBody
                                    key={index}
                                    name={name}
                                    handle={handle}
                                    tweet={tweetText}
                                    image={image}
                                />

                                <TweetButtons data={buttonData}
                                              likeTweetCallback={this.props.likeTweetCallback}
                                              retweetTweetCallback={this.props.retweetTweetCallback}
                                              replyTweetCallback={this.props.replyTweetCallback}
                                              bookmarkCallback={this.props.bookmarkCallback}/>
                            </div>
                        )
                    })}
                </div>
            </PullToRefresh>
        );
    }
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        "margin-left": 65,
        "margin-right": 10
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

export default ViewTweets;