import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Card, Form, InputGroup, Button } from 'react-bootstrap';
class settings extends Component {
    constructor(props) {
        super(props);
        this.state = { collapseID: "collapse3" }
    }
    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    render() {
        const { collapseID } = this.state;
        let collapsable = (
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Username
            </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Form><Form.Group controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control placeholder="ahuja101992" />
                                </InputGroup>
                                <Form.Text className="text-muted">
                                    You are not allowed to change your username.
                                    </Form.Text>
                            </Form.Group></Form>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        Phone Number
            </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <Form><Form.Group controlId="formBasicPhone">
                                <Form.Label>Phone Number</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">+1</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control placeholder="88888888" />
                                </InputGroup>
                                <Form.Text className="text-muted">
                                    You are not allowed to change your username.
                                    </Form.Text>
                            </Form.Group></Form>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                        Email
             </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                        <Card.Body><Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group></Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="3">
                        Password
          </Accordion.Toggle>
                    <Accordion.Collapse eventKey="3">
                        <Card.Body><Form>
                            <Form.Group controlId="formCurrPassword">
                                <Form.Label>Current Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group controlId="formNewPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group controlId="formConfirmPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form></Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="4">
                        Deactivate Your Account
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="4">
                        <Card.Body><div class="text-message">You’re about to start the process of deactivating your Twitter account. Your display name, @username, and public profile will no longer be viewable on Twitter.com, Twitter for iOS, or Twitter for Android.</div>
                            <Button variant="danger" type="submit">
                                Deactivate Account
                            </Button>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>);
        return (
            <div class="settings-list-container col-sm-9">
                <div class="account-heading row">Account</div>
                <hr></hr>
                <div class="login-heading row">Login and Security</div>
                <hr></hr>
                <div>{collapsable}</div>
            </div>
        );
    }
}

export default settings;