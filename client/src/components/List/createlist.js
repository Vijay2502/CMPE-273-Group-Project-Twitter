import React from 'react';
import {Modal} from "react-bootstrap";
import '../../css/createlist.css'
import AssignmentSharpIcon from '@material-ui/icons/AssignmentSharp';
import IconButton from '@material-ui/core/IconButton';

class CreateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {openTweetModal: false};
        this.newList = this.newList.bind(this);
        this.cancelList = this.cancelList.bind(this);
    }

    newList = e => {
        this.setState({openTweetModal: true});
    };
    cancelList = e => {
        this.setState({openTweetModal: false});
    };

    render() {
        return (
            <div>
                <IconButton edge="end" aria-label="list" onClick={this.newList}>
                    <AssignmentSharpIcon/>
                </IconButton>
                <Modal
                    show={this.state.openTweetModal}
                    onHide={this.cancelList}
                    animation={false}
                >
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <form>
                            <input maxlength="25" name="name" type="text" id="moomINPUT_1"/>
                            <input type="text" id="login" class="fadeIn second" name="login" placeholder="login"/>
                            <input type="text" id="password" class="fadeIn third" name="login" placeholder="password"/>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <div class="btn-tweet">
                            <button class="btn btn-primary submit-btn" type="button">
                                Create
                            </button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default CreateList;
