import React from 'react';
import {Form,Modal} from "react-bootstrap";
import '../../css/createlist.css'
import AssignmentSharpIcon from '@material-ui/icons/AssignmentSharp';
import IconButton from '@material-ui/core/IconButton';
import {createList} from "../../redux/actions/listActions";
import {connect} from "react-redux";

function mapStateToProps(store) {
    return {
        successMessage: store.list.successMessage,
        errorMessage: store.list.errorMessage,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createList: (payload) => dispatch(createList(payload))
    };
}

class CreateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openListModal: false,
            addMemberModal:false,
            name:"",
            description:""
        }
        // this.newList = this.newList.bind(this);
        // this.createList = this.createList.bind(this);
    }

    newList = () => {
        this.setState({openListModal: true});
    };
    cancelList = () => {
        this.setState({openListModal: false});
    };
    nextModal = () => {
        this.setState({addMemberModal: true});
    };
    cancelMember = () => {
        this.setState({addMemberModal: false});
    };
    nextList =()=>{
        this.nextModal();
        this.setState({openListModal: false});
    }
    createList=()=>{
        
    }

    render() {
        return (
            <div>
                <IconButton edge="end" aria-label="list" onClick={this.newList}>
                    <AssignmentSharpIcon/>
                </IconButton>
                <Modal
                    show={this.state.openListModal}
                    onHide={this.cancelList}
                    animation={false}
                >
                      <Modal.Header closeButton>
                        <div class="btn-tweet">
                            <button
                                class="btn btn-primary save-btn"
                                type="button"
                                onClick={this.nextList}
                            >
                                Next
                            </button>
                        </div>
                        <Modal.Title>Create List</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div class="edit-list-form">
                            <Form>
                            {/* <input maxlength="25" name="name" type="text" id="moomINPUT_1"/> */}
                                <Form.Group controlId="formGridName" >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        placeholder="Name"
                                        value={this.state.listName}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formGridBio">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows="3"
                                        placeholder="description"
                                        value={this.state.Description}
                                    />
                                </Form.Group>
                            </Form>
                        </div>
                        {/* <form>
                            <input maxlength="25" name="name" type="text" id="moomINPUT_1"/>
                            <input type="text" id="name" class="fadeIn second" name="name" placeholder="name"/>
                            <input type="text" id="description" class="fadeIn third" name="description" placeholder="description"/>
                        </form> */}
                    </Modal.Body>
                </Modal>


             {/* *************************************NEXT MODAL************************* */}
             <Modal
                    show={this.state.addMemberModal}
                    onHide={this.cancelMember}
                    animation={false}
                >
                      <Modal.Header closeButton>
                        <div class="btn-tweet">
                            <button
                                class="btn btn-primary save-btn"
                                type="button"
                                onClick={this.Create}
                            >
                                Done
                            </button>
                        </div>
                        <Modal.Title>Add Members</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div class="add-members-form">
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateList);
