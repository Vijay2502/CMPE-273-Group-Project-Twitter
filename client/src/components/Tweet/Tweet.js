import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {createTweet} from "../../redux/actions/tweetsActions";

function mapStateToProps(store) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        createTweet: (payload) => dispatch(createTweet(payload))
    };
}

class Tweet extends Component {
    image = () => {
        return (
            <img src={require("../../static/images/profile_pic.png")} alt="Logo" className="picture"/>
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

        this.props.createTweet({"user": data});
    };

    render() {
        return (
            <div style={{width: 566, padding: 10}}>
                <Form onSubmit={this.createTweet}>
                    <div>
                        <Form.Row>
                            <div style={styles.profileImage}> {this.image()}</div>

                            <div style={styles.tweetTextBox}>
                                <Form.Group controlId="formGridAddress1">
                                    <Form.Control type="textarea" placeholder="What's happening?"/>
                                </Form.Group>
                            </div>
                        </Form.Row>
                    </div>

                    <div style={{marginTop: 40}}>
                        <Form.Row>
                            <button type="button" className="list-group-item list-group-item-action borderless"
                                    style={styles.image}>
                                <FontAwesomeIcon icon={faImage}/>
                            </button>

                            <div style={styles.tweetButton}>
                                <Button variant="primary" type="submit">
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
        flex: 1,
        display: "flex",
        flexDirection: "column",
        paddingRight: 10
    },
    tweetTextBox: {
        flex: 5,
        display: "flex",
        marginTop: 20,
        flexDirection: "column",
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
        marginLeft: "auto",
        backgroundColor: "#2F99EA"
    },
};

export default connect(mapStateToProps, mapDispatchToProps)(Tweet);

