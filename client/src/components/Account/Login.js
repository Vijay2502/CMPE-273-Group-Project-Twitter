import React, { Component } from 'react';
import logo from '../../static/images/login_twitter_logo.png';
import {signIn} from "../../actions/authActions";
import {connect} from "react-redux";
import {Button, Col, Form} from "react-bootstrap";

function mapStateToProps(store) {
  return {
    signinSuccess: store.auth.signinSuccess,
    signinMessage: store.auth.signinMessage,
    userId: store.auth.userId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: (payload) => dispatch(signIn(payload))
  };
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users:
        [
        ]
    }

  }

  signIn = (e) => {
    e.preventDefault();
    //const data = new FormData(e.target);
    const data = {};
    for (let i = 0; i < e.target.length; i++) {
      if (e.target[i].name !== "") {
        data[e.target[i].name] = e.target[i].value;
      }
    }
    data.userType = "buyer";

    this.props.signIn({"user": data});
  };


  render() {
    return (
          <div style={styles.container}>
            <div >
              <img style={styles.logo} src={logo} alt="Quora"/>
            </div>
            <h3 style={styles.message}>Log in to Twitter</h3>
            <Form onSubmit={this.signIn}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);

