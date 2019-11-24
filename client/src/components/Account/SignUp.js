import React, {Component} from 'react';
import {Redirect} from 'react-router';
import logo from '../../static/images/login_twitter_logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Form, Toast} from "react-bootstrap";
import {signUp} from "../../redux/actions/authActions";
import Expire from "./Expire";
import {connect} from "react-redux";

function mapStateToProps(store) {
    return {
        signupSuccess: store.auth.signupSuccess,
        signupMessage: store.auth.signupMessage,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signUp: (payload) => dispatch(signUp(payload))
    };
}

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.signUp = this.signUp.bind(this);
        this.state = {
            redirectVar: false,
            test: false
        }
    }

    signUp = (e) => {
        e.preventDefault();

        const data = {};
        for (let i = 0; i < e.target.length; i++) {
            if (e.target[i].id !== "") {
                data[e.target[i].id] = e.target[i].value;
            }
        }

        this.props.signUp(data);
        this.setState({test: true});
    };


    callbackFunction = (val) => {
        this.setState({redirectVar: val})
    };

    render() {
        return (
            <div style={styles.container}>
                {this.state.redirectVar === true && <Redirect to={{
                    pathname: "/login"
                }}/>}

                {this.props.signupSuccess === true && <Expire delay={5000} parentCallback={this.callbackFunction}  >
                    <Toast>
                        <Toast.Header>
                            <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                            <strong className="mr-auto">Notification</strong>
                        </Toast.Header>
                        <Toast.Body>You have successfully signed-up! You are being redirected to the login page in 5 seconds.</Toast.Body>
                    </Toast>
                </Expire>}


                <div>
                    <img style={styles.logo} src={logo} alt="Quora"/>
                </div>

                <h3 style={styles.message}>SignUp</h3>
                <Form onSubmit={this.signUp}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="firstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control placeholder="What's your first name?"/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="lastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control placeholder="What's your last name?"/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control placeholder="Enter a cool username"/>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control  placeholder="What's your email?"/>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter a strong password"/>
                    </Form.Group>

                    <Button style={styles.signUpButton} variant="primary" type="submit">
                        Sign up
                    </Button>
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
    signUpButton: {
        width: "30rem",
        backgroundColor: "#2F99EA"
    },
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);


