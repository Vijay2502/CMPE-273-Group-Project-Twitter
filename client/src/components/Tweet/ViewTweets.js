import React, {Component} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage, faRetweet, faShareSquare} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {createTweet} from "../../redux/actions/tweetsActions";
import {PullDownContent, PullToRefresh, RefreshContent, ReleaseContent} from "react-js-pull-to-refresh";
import {TweetBody} from "../HomeTweetList/listview";
import {faComment, faHeart} from "@fortawesome/free-regular-svg-icons";
import Tweet from "./CreateTweet";



class ViewTweets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isOpenCommentModal: false
        };

        this.handleRefresh = this.handleRefresh.bind(this);
        //this.getUser = this.getUser.bind(this)
    }

    handleRefresh() {
        //dispatch
        // return new Promise((resolve) => {
        //     this.getUser()
        // });
    }

    componentWillMount() {
        //this.getUser()
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

    openCommentModal = e => {
        this.setState({isOpenCommentModal: true});
    };

    closeCommentModal = e => {
        this.setState({isOpenCommentModal: false});
    };

    render() {
        console.log("render HomeTweetList");
        return (
                <PullToRefresh
                    pullDownContent={<PullDownContent/>}
                    releaseContent={<ReleaseContent/>}
                    refreshContent={<RefreshContent/>}
                    pullDownThreshold={2}
                    onRefresh={this.handleRefresh}
                    triggerHeight={50}
                    backgroundColor='white'>

                    <div className="main-body">
                        {[...this.props.dataFromParent].map((user, index) => {
                            let name = `${user.name.first} ${user.name.last}`;
                            let handle = `@${user.name.first}${user.name.last}`;
                            let image = user.image;
                            let tweet = user.tweet;
                            console.log(image);
                            return (
                                <div>
                                    <TweetBody
                                        key={index}
                                        name={name}
                                        handle={handle}
                                        tweet={tweet}
                                        image={image}/>

                                    <div style={styles.container}>
                                        <button
                                            type="button"
                                            className="list-group-item list-group-item-action borderless"
                                            style={styles.reply}
                                            onClick={this.openCommentModal}
                                        >
                                            <FontAwesomeIcon icon={faComment}/>
                                        </button>
                                        <button
                                            type="button"
                                            className="list-gr oup-item list-group-item-action borderless"
                                            style={styles.retweet}
                                        >
                                            <FontAwesomeIcon icon={faRetweet}/>
                                        </button>
                                        <button
                                            type="button"
                                            className="list-group-item list-group-item-action borderless"
                                            style={styles.like}
                                        >
                                            <FontAwesomeIcon icon={faHeart}/>
                                        </button>
                                        <button
                                            type="button"
                                            className="list-gr oup-item list-group-item-action borderless"
                                            style={styles.share}
                                        >
                                            <FontAwesomeIcon icon={faShareSquare}/>
                                        </button>

                                        <Modal
                                            show={this.state.isOpenCommentModal}
                                            onHide={this.closeCommentModal}
                                            animation={false}
                                            style={{width: 666}}
                                        >
                                            <Tweet/>
                                        </Modal>
                                    </div>
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

export default ViewTweets;