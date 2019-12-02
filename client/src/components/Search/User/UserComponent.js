import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Button, Row, Col } from 'reactstrap';


import { UserBody } from './UserBody';
import { HOSTNAME } from "../../../constants/appConstants";
const API_PATH = `http://${HOSTNAME}:8080`

class UserComponent extends Component {
    state = {
        followed: this.props.user.followed,
    }

    tokenConfig = () => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };
        if (token) {
            config.headers['Authorization'] = token;
        }

        return config;
    };

    follow = (followeeId) => {
        axios.post(API_PATH + `/user/${this.props.callerId}/follow`, { followeeId }, this.tokenConfig()).then(res => {
            if (res.data.status == "ok") {
                this.setState({
                    followed: true
                });
            }
        }).catch(err => {
            console.log(err);
        });

    }

    unfollow = (followeeId) => {
        axios.post(API_PATH + `/user/${this.props.callerId}/unfollow`, { followeeId }, this.tokenConfig()).then(res => {
            if (res.data.status == "ok") {
                this.setState({
                    followed: false
                });
            }
        }).catch(err => {
            console.log(err);
        });

    }

    render() {
        return (<Row>
            <Col>
                <UserBody
                    user={this.props.user}
                />
            </Col>
            <Col>
                {this.props.callerId ? (this.state.followed ? (<div class="reply-tweet-submit-container" >
                    <Button class="btn-container" color='danger' type="submit">
                        Unfollow
        </Button>
                </div>) : (<div class="reply-tweet-submit-container" >
                    <Button class="btn-container" color='primary' type="submit">
                        Follow
        </Button>
                </div>)) : <div></div>}
            </Col>
        </Row>)
    }
}

export default UserComponent;