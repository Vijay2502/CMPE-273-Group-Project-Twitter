import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHeart} from "@fortawesome/free-regular-svg-icons";
import {faRetweet, faShareSquare} from "@fortawesome/free-solid-svg-icons";
import {Modal} from "react-bootstrap";
import ReplyTweet from "./ReplyTweet";

class TweetButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            retweetIncrement: 0,
            likeIncrement: 0,
            replyCountIncrement: 0,
            isOpenCommentModal: false
        };
    }

    openCommentModal = () => {
        this.setState({ isOpenCommentModal: true });
    };

    closeCommentModal = () => {
        this.setState({ isOpenCommentModal: false });
    };

    triggerReplyCountIncrement = () => {
        this.setState({ replyCountIncrement: 1 });
    };



    render() {
        return (
            <div>
                <div style={styles.container}>
                    <button
                        type="button"
                        className="list-group-item list-group-item-action borderless"
                        style={styles.reply}
                        onClick={this.openCommentModal}
                    >
                        <FontAwesomeIcon icon={faComment} />
                        {this.props.data.replyCount + this.state.replyCountIncrement}
                    </button>

                    <button
                        type="button"
                        className="list-group-item list-group-item-action borderless"
                        style={styles.retweet}
                        onClick={() => {
                            console.log("faRetweet this.props.data", this.props.data)
                            this.props.retweetTweetCallback(this.props.data.tweetData, this.props.data.owner,
                                this.props.data.retweetingUserId, this.props.data.tweetId)
                            this.setState({retweetIncrement: 1})
                        }}
                    >
                        <FontAwesomeIcon icon={faRetweet} />
                        {this.props.data.retweetCount + this.state.retweetIncrement}
                    </button>

                    <button
                        type="button"
                        className="list-group-item list-group-item-action borderless"
                        style={styles.like}
                        onClick={() => {
                            console.log("faHeart this.props.data", this.props.data)
                            this.props.likeTweetCallback(this.props.data.tweetId, this.props.data.retweetingUserId)
                            this.setState({likeIncrement: 1})
                        }}
                    >
                        <FontAwesomeIcon icon={faHeart} />
                        {this.props.data.likes + this.state.likeIncrement}
                    </button>
                    <button
                        type="button"
                        className="list-group-item list-group-item-action borderless"
                        style={styles.share}
                        onClick={() => {
                            this.props.bookmarkCallback(this.props.data.tweetId, this.props.data.retweetingUserId)
                        }}
                    >
                        <FontAwesomeIcon icon={faShareSquare} />
                    </button>
                </div>

                <Modal
                    show={this.state.isOpenCommentModal}
                    onHide={this.closeCommentModal}
                    animation={false}
                >
                    <ReplyTweet data={this.props.data.tweetId}
                                triggerReplyCountIncrement={this.triggerReplyCountIncrement}
                                closeCommentModal={this.closeCommentModal}/>
                </Modal>
            </div>
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

export default TweetButtons;