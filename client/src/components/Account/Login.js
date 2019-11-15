import React, { Component } from 'react';
import { PullToRefresh, PullDownContent, ReleaseContent, RefreshContent } from "react-js-pull-to-refresh";
import {Button, Col, Form} from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users:
        [
        ]
    }

    this.handleRefresh = this.handleRefresh.bind(this)
    this.getUser = this.getUser.bind(this)
  }

  handleRefresh() {
    //dispatch
    return new Promise((resolve) => {
      this.getUser()
    });
  }
  componentWillMount() {
    this.getUser()
  }

  getUser() {
    fetch('https://randomuser.me/api/')
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Request failed.');
      })
      .then(data => {
        this.setState({
          users: [
            {
              name: data.results[0].name,
              image: data.results[0].picture.medium,
              tweet: data.results[0].email,
            },
            ...this.state.users,
          ]
        });
      })
      .catch(error => {
        console.log(error);
      });
  }



  render() {
    return (
          <div>
            <h1>Log in to Twitter</h1>
            <Form>
              <Form.Group controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Log in
              </Button>

              <div style={{marginTop: 40}}>
                <Form.Row>
                  <Form.Label>New to Twitter?</Form.Label>

                  <Button variant="primary" type="submit">
                    Sign up
                  </Button>
                </Form.Row>
              </div>


            </Form>
          </div>
    );
  }
}

export default Login;

