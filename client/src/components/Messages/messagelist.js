import React, { Component } from 'react';
import { Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faComment } from "@fortawesome/free-solid-svg-icons";
import "./messagelist.css";

class messagelist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startNewChat: false,
            users: [],
            chatList: []
        }
    }
    newChat = () => {
        this.setState({ startNewChat: true });
    }
    closeNewChat = () => {
        this.setState({ startNewChat: false });
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.getUser();
        console.log("testing search");
    }
    componentDidMount = () => {
        console.log("kjkj");
        // this.getUser()
    }
    getUser = () => {
        fetch('https://randomuser.me/api/')
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('Request failed.');
            })
            .then(data => {
                console.log("kjjsjk", JSON.stringify(data));
                for (let i = 0; i < 5; i++) {
                    this.setState({
                        users: [
                            {
                                name: data.results[0].name,
                                image: data.results[0].picture.medium,
                                email: data.results[0].email
                            },
                            ...this.state.users,
                        ]
                        ,
                        chatList: [
                            {
                                name: data.results[0].name,
                                image: data.results[0].picture.medium,
                                email: data.results[0].email,
                                date: data.results[0].registered.date
                                // date:  data.result[0].registered.date
                            },
                            ...this.state.users,
                        ]
                    });
                }

            })
            .catch(error => {
                console.log(error);
            });

    }
    render() {
        let userList = null, noMsgContainer = null, messageList = null;
        if (this.state.users.length > 0) {
            console.log("here");
            userList = this.state.users.map(user => {
                console.log(JSON.stringify(user));
                return (
                    <div class="list-group">
                        <div class="list-group-item list-group-item-action user-list row">
                            <div class="image-container col-sm-2"><img src={user.image} class="profile-image" alt="avatar"></img></div>
                            <div class="col-sm-10">
                                <div class="profile-name">{user.name.first + " " + user.name.last}</div>
                                <div class="profile-email">{user.email}</div>
                                <div>chat - link</div>

                            </div>
                        </div>
                    </div>
                );
            });
        }
        if (this.state.chatList.length == 0) {
            noMsgContainer = (
                <div class="messagelist-body">
                    <div class="no-message-header">Send a message, get a message</div>
                    <div class="no-message-body">Direct Messages are private conversations between you and other people on Twitter. Share Tweets, media, and more!</div>
                    <div class="start-btn">
                        <button
                            type="button"
                            onClick={this.newChat}
                            class="btn btn-primary start-chat-btn"
                        >
                            <span>Start a conversation</span>
                        </button>
                    </div>
                </div>
            );
        }
        else {
            messageList = this.state.chatList.map(chat => {
                console.log(JSON.stringify(chat));
                return (
                    <div class="list-group">
                        <div class="list-group-item list-group-item-action chat-list-container row">
                            <div class="image-container col-sm-2"><img src={chat.image} class="msg-profile-image" alt="avatar"></img></div>
                            <div class="profile-name col-sm-3">{chat.name.first + " " + chat.name.last}</div>
                            <div class="profile-email col-sm-4">{chat.email}</div>
                            <div class="profile-date col-sm-3">Aug, 10 2019</div>
                        </div>
                    </div>);
            });
        }

        return (
            <div class="message-list-container col-sm-10">

                <div class="message-header row">
                    <div class="col-sm-11">Messages</div>
                    <div class="col-sm-1" onClick={this.newChat}><FontAwesomeIcon icon={faComment} /></div>
                </div>
                <hr></hr>
                <div>{noMsgContainer}</div>
                <div>{messageList}</div>
                <Modal
                    show={this.state.startNewChat}
                    onHide={this.closeNewChat}
                    animation={false}
                    scrollable={true}
                >
                    <Modal.Header closeButton>
                        {/* <div class="btn-tweet">
                            <button
                                class="btn btn-primary save-btn"
                                type="button"
                                onClick={this.handleSearch}
                            >
                                Search
                            </button>
                        </div> */}
                        <Modal.Title>New Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form class="search-body" onSubmit={this.handleSearch}>
                            <Form.Group controlId="formBasicEmail">
                                {/* <FontAwesomeIcon icon={faSearch} /> */}
                                <Form.Control type="text" placeholder="Search people">
                                    {/* <FontAwesomeIcon icon={faSearch} /> */}
                                </Form.Control>
                                <div class="search-result">{userList}</div>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default messagelist;