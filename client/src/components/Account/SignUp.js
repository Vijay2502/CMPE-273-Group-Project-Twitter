import React, { Component } from 'react';
import logo from '../../static/images/login_twitter_logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, Col, Pagination} from "react-bootstrap";

class SignUp extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={styles.container}>
                <div >
                    <img style={styles.logo} src={logo} alt="Quora"/>
                </div>

                <h3 style={styles.message}>SignUp</h3>
                <Form>
                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="What's your name?" />
                    </Form.Group>

                    <Form.Group controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Month</Form.Label>
                            <Form.Control as="select">
                                <option>Choose...</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Day</Form.Label>
                            <Form.Control as="select">
                                <option>Choose...</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                            <Form.Label>Year</Form.Label>
                            <Form.Control as="select">
                                <option>Choose...</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

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

export default SignUp;

