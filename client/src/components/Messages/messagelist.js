import React, { Component } from 'react';
import { Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faComment } from "@fortawesome/free-solid-svg-icons";
import io from 'socket.io-client';
import { Launcher } from 'react-chat-window';
import "./messagelist.css";
import axios from 'axios';

class messagelist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startNewChat: false,
            users: [],
            chatList: [],
            username: ""
        }
    }
    newChat = () => {
        //////opening modal for search people//////////
        this.setState({ startNewChat: true });
    }
    closeNewChat = () => {

        //////closing modal for search people//////////
        this.setState({ startNewChat: false });

    }
    handleChange = (e) => {
        //search user api in below function
        this.setState({ username: e.target.value });
    }

    componentDidMount = () => {
        //////////////////get the list of previous chat list of the users/////////////////
        axios.defaults.withCredential = true;
        //let userId = localStorage.getItem('first_name');
        let userId = 1;
        axios.get(`http://localhost:8080/api/v1/conversation/getByUser/${userId}`)
            .then(response => {
                console.log(response.data);
                this.setState(
                    {
                        chatList: response.data.data
                    }, () => console.log('message response', this.state.chatList)
                );
            })
            .catch(err => {
                console.error(err);
            });
    }

    searchUsers = (e) => {
        alert('ffff');
        e.preventDefault();
        var params = new URLSearchParams();
        params.append("text", this.state.username);
        let request = {
            params: params
        };
        axios.defaults.withCredential = true;
        //let userId = localStorage.getItem('userId');
        let userId = 1;
        axios.get(`http://localhost:8080/api/v1/search/users`, request)
            .then(response => {
                console.log("check here ->>>>>>>>>>>>", response.data.data.users);
                this.setState(
                    {
                        chatList: []
                    }, () => console.log('message response', this.state.chatList)
                );
            })
            .catch(err => {
                console.error(err);
            });
    }


    findParticipant = (data = []) => {

        try {
            let firstName = localStorage.getItem("firstName");
            let participantName = "";
            data.forEach((message) => {
                if (message.sender && message.sender != firstName) {
                    participantName = message.sender;
                }
            });
            return participantName;
        }
        catch (e) {
            console.log(e);
            return "";
        }

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

                //Get Last Seen Date            
                let lastSeen = '';
                let lastdate = new Date(chat.updatedAt);
                let currentDate = new Date();
                const daysDiff = Math.ceil((currentDate - lastdate) / (1000 * 60 * 60));
                if (daysDiff <= 24)
                    lastSeen = daysDiff + " hr";
                else
                    lastSeen = (daysDiff % 24) + " days"


                //Get Last Message 
                let lastMessage = "";
                if (chat.messages && chat.messages.length > 0) {
                    lastMessage = chat.messages[chat.messages.length - 1]["message"];
                }

                //Get Incoming message details
                let participantName = "User";
                participantName = this.findParticipant(chat.messages);
                console.log(participantName);
                return (
                    <div class="list-group">
                        <div class="list-group-item list-group-item-action chat-list-container row chat-vs">

                            <div className="user-chat-container">
                                <div className="user-details">
                                    <div className="user-name">
                                        {
                                            participantName
                                        }
                                    </div>
                                    <div className="last-message">
                                        {
                                            lastMessage
                                        }
                                    </div>
                                </div>
                                <div className="last-date">
                                    {lastSeen}
                                </div>


                            </div>

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
                        <Modal.Title>New Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form class="search-body" onSubmit={this.searchUsers}>
                            <Form.Group controlId="formBasicEmail">
                                {/* <FontAwesomeIcon icon={faSearch} /> */}
                                <Form.Control type="text" placeholder="Search people" value={this.state.username} onChange={this.handleChange}>
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