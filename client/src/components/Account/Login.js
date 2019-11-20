import React, { Component } from 'react';
import logo from '../../images/login_twitter_logo.png';
import {Button, Form} from "react-bootstrap";

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
          <div style={styles.container}>
            <div >
              <img style={styles.logo} src={logo} alt="Quora"/>
            </div>
            <h3 style={styles.message}>Log in to Twitter</h3>
            <Form>
              <div style={styles.email}>
                <Form.Group controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
              </div>

              <div style={styles.email}>
                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" />
                </Form.Group>
              </div>
              <div >
                <Button style={styles.loginButton} variant="primary" type="submit">
                  Log in
                </Button>
              </div>

              <div style={styles.signUpBox}>
                <Form.Row>
                    <Form.Label style={{paddingTop: 10, paddingRight: 5}}>New to Twitter?</Form.Label>

                    <Button style={styles.signUpButton} variant="primary" type="submit">
                      Sign up
                    </Button>
                </Form.Row>
              </div>
            </Form>
          </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  message: {
    fontWeight: "bold",
    paddingTop: "2rem"
  },
  logo: {
    paddingTop: "10px",
    width: "50px",
  },
  email: {
    width: "30rem",
  },
  loginButton: {
    width: "30rem",
    backgroundColor: "#2F99EA"
  },
  signUpBox: {
    marginTop: 40
  },
  signUpButton: {
    backgroundColor: "#2F99EA"
  },
};

export default Login;

