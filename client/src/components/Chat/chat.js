import React, { Component } from "react";
import io from 'socket.io-client';
import axios from 'axios';
import { Launcher } from 'react-chat-window';
import {HOSTNAME} from "../../constants/appConstants";

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = Object.assign({}, {
            message: null, socket: null, userId: null, other_userId: null, channel: null,
            messages: []
        })
    }



    componentDidMount() {
        const socket = io(`http://${HOSTNAME}:3002`);
        console.log("---->>>>>>>>>>>>>>>>>", this.props);

        this.setState({
            socket: socket,
            channel: this.props.channel
        }, () => {
            socket.emit('channel id', this.state.channel);
            socket.on(this.state.channel, (message) => {
                const messages = this.state.messages;
                message = JSON.parse(message);
                let firstName = localStorage.getItem('firstName');
                messages.push({
                    author: firstName == message.sender ? "me" : "them", type: 'text', data: { text: message.message }
                });

                this.setState({
                    messages: messages
                })
            })

        });

        // get messages
        axios.defaults.withCredential = true;
        let channel = this.props.channel;
        let firstName = localStorage.getItem('firstName');
        let userId = localStorage.getItem('id');
        axios.get(`http://${HOSTNAME}:8080/api/v1/conversation/getMessages/${channel}`)
            .then(response => {

                if (response.data.data) {
                    console.log("getByChannel", response.data.data);
                    this.setState(
                        {
                            messages: response.data.message.map(m => ({
                                author: firstName == m.sender ? "me" : "them", type: 'text', data: { text: m.message }
                            }))
                        }
                    );
                }

            })
            .catch(err => {
                console.error(err);
            });
    }

    handleSendMessage = (message) => {
        this.state.socket.emit(this.state.channel, JSON.stringify({
            message: message,
            sender: localStorage.getItem('firstName')
        }));
    }

    _sendMessage(message) {
        if (message.data.text.length > 0) {
            this.handleSendMessage(message.data.text);
        }
    }

    render() {
        let messages = this.state.messages;
        return (<div>
            <Launcher
                agentProfile={{
                    teamName: 'Twitter chat windowd',
                    imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                }}
                onMessageWasSent={this._sendMessage.bind(this)}
                messageList={messages}
                showEmoji={false}
            />
        </div>)

    }
}

export default Chat