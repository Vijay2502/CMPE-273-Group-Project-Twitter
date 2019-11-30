import React, { Component } from 'react';
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { createTweet } from "../../redux/actions/tweetsActions";
import "./tweets.css"

function mapStateToProps(store) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        createTweet: (payload) => dispatch(createTweet(payload))
    };
}

class CreateTweet extends Component {
    image = () => {
        return (
            <img src={require("../../static/images/profile_pic.png")} alt="Logo" className="profile-pic" />
        )
    };

    createTweet = (e) => {
        e.preventDefault();

        const data = {};
        for (let i = 0; i < e.target.length; i++) {
            if (e.target[i].name !== "") {
                data[e.target[i].name] = e.target[i].value;
            }
        }

        this.props.createTweet({ "user": data });
    };

    render() {
        return (
            <div style={{ padding: 10 }}>
                <Form onSubmit={this.createTweet}>
                    <div>
                        <Form.Row>
                            <div style={styles.profileImage}> {this.image()}</div>

                            <div style={styles.tweetTextBox}>
                                <textarea
                                    class="form-control text-area"
                                    id="message-text"
                                    placeholder="Tweet your reply"
                                    rows="3"
                                ></textarea>
                                {/* <Form.Group controlId="formGridAddress1">
                                    <Form.Control as="textarea" row="3" placeholder="Tweet your reply" />
                                </Form.Group> */}
                            </div>
                        </Form.Row>
                    </div>

                    <div style={{ marginTop: 40 }}>
                        <Form.Row>
                            <button type="button" className="list-group-item list-group-item-action borderless"
                                style={styles.image}>
                                <FontAwesomeIcon icon={faImage} />
                            </button>

                            <div class="reply-tweet-submit-container" style={styles.tweetButton}>
                                <Button class="btn-container" type="submit">
                                    Tweet
                                </Button>
                            </div>
                        </Form.Row>
                    </div>
                </Form>
            </div>
        );
    }
}

const styles = {
    profileImage: {
        // flex: 1,
        display: "flex",
        flexDirection: "column",
        paddingRight: 15
    },
    tweetTextBox: {
        flex: 5,
        display: "flex",
        marginTop: 20,
        flexDirection: "column",
        "padding-right": 15
    },
    image: {
        display: "flex",
        flexDirection: "column",
        paddingRight: 10
    },
    tweetButton: {
        display: "flex",
        flexDirection: "column",
        width: "5",
        "margin-right": 15,
        marginLeft: "auto"
    },
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTweet);

