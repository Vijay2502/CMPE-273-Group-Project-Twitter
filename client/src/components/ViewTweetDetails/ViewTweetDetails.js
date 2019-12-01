import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import './ViewTweetDetails.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faImage, faRetweet, faShareSquare, faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { Button, Form, Modal } from "react-bootstrap";
import CreateTweet from "../Tweet/CreateTweet";


const Image = (props) => {
    return (
        <img src={props.image} alt="" className="picture">
        </img>
    )
};

const Handle = (props) => {
    return (
        <div className="handle">
            {props.handle}
        </div>
    )
};

const Name = (props) => {
    return (
        <div className="name">
            {props.name}
        </div>
    )
};

const Tweet = (props) => {
    return (
        <div className="tweet">
            {props.tweet}
        </div>
    )
};


class ViewTweetDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirectToTweet: false,
            replies: []
        }

    }

    getReplies = () => {
        console.log("In get reply");
        axios.get(`http://localhost:8080/api/v1/tweet/3cd8c430-13ec-11ea-a40d-57a00194fdf6/replies`)
            .then(response => {
                console.log(response);
                this.setState(
                    {
                        "replies": response.data.data.tweets  // What??
                    }
                );
            })
            .catch(err => {
                console.error(err);
            });
    }

    componentDidMount() {
        console.log("this works");


        // get messages
        axios.defaults.withCredential = true;
        let channel = '1|2';
        let firstName = localStorage.getItem('firstName');
        axios.get(`http://localhost:8080/api/v1/tweet/byId/3cd8c430-13ec-11ea-a40d-57a00194fdf6`)
            .then(response => {
                console.log(response);
                this.setState(
                    {
                        "data": response.data.data  // What??
                    }, () => this.getReplies()
                );
            })
            .catch(err => {
                console.error(err);
            });
    }

    goBackToFeeds() {
        console.log("back");
        try {
            document.querySelector("#root > div > div > div > div:nth-child(1) > div > div.col-sm-3.sidebar > div > button:nth-child(2)").click();
        }
        catch (e) {
            console.log(e);
        }
    }


    render() {

        let tweetData = this.state.data;
        let tweetReplies = this.state.replies;
        console.log(this.state);
        if (!tweetData) {
            return (null);
        }
        console.log(tweetData);
        return (

            tweetData.data ? (<div class="list-group">
                <div className="list-group-item list-group-item-action display-tweet" style={{ "display": "block" }}>

                    <div className="tweet-header" onClick={this.goBackToFeeds}>
                        <FontAwesomeIcon icon={faLongArrowAltLeft} /> Tweet
                    </div>

                    <Image image={tweetData.owner.image} />
                    <div className="body">
                        <div className="inner-body-inner">
                            <Name name={tweetData.owner.firstName} />
                            <Handle handle={"@" + tweetData.owner.username} />
                        </div>
                        <Tweet tweet={this.props.tweet} />
                    </div>

                    <div className="tweet-details">
                        <div className="tweet-text">
                            {tweetData.data.text}
                        </div>
                        <div className="tweet-date">
                            {
                                tweetData.createdAt
                            }
                        </div>


                        {/* REPEATED CODE - CHANGE TO RCC */}
                        <div style={styles.container}>
                            <button
                                type="button"
                                className="list-group-item list-group-item-action borderless"
                                style={styles.reply}
                                onClick={this.openCommentModal}
                            >
                                <FontAwesomeIcon icon={faComment} />
                            </button>
                            <button
                                type="button"
                                className="list-group-item list-group-item-action borderless"
                                style={styles.retweet}
                            >
                                <FontAwesomeIcon icon={faRetweet} />
                            </button>
                            <button
                                type="button"
                                className="list-group-item list-group-item-action borderless"
                                style={styles.like}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                            <button
                                type="button"
                                className="list-group-item list-group-item-action borderless"
                                style={styles.share}
                            >
                                <FontAwesomeIcon icon={faShareSquare} />
                            </button>

                            <Modal
                                show={this.state.isOpenCommentModal}
                                onHide={this.closeCommentModal}
                                animation={false}
                            >
                                <CreateTweet />
                            </Modal>
                        </div>



                        <div class="reply-box">

                            {
                                tweetReplies.map((tweet) => {
                                    return (
                                        <div className="reply">
                                            <button type="button" className="inner-body list-group-item list-group-item-action" onClick={(e) => this.displayTweet()}>
                                                <Image image={tweet.owner.image} />
                                                <div className="body">
                                                    <div className="inner-body-inner">
                                                        <Name name={tweet.owner.firstName} />
                                                        <Handle handle={tweet.owner.username} />
                                                    </div>
                                                    <Tweet tweet={tweet.data.text} />
                                                </div>
                                            </button>
                                        </div>
                                    )
                                })
                            }

                        </div>



                    </div>


                </div>

            </div>) : null
        )
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


export default ViewTweetDetails;