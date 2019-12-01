import React from 'react';
import { Form, Modal } from "react-bootstrap";
import "../Messages/messagelist.css";
import { removeMem, getMemberInAList } from "../../redux/actions/listActions";
import { connect } from "react-redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

function mapStateToProps(store) {
    return {
        members: store.list.memebers
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeMem: (payload) => dispatch(removeMem(payload)),
        getMemberInAList: (id) => dispatch(getMemberInAList(id))
    };
}

const handleListItemClick = (event, index) => {
    console.log("clicked")
  };

const handleToggle = (event,index) => {
    console.log("toggle")
  };

class listMembers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            membersModal: false,
        }
    }

    getList = () => {
      this.props.members.map((user, index) => {
        const labelId = `checkbox-list-secondary-label-${index}`;
        return(
        <div>
            <ListItem
                key={index}
                dense button
                onClick={event => this.handleListItemClick(event, index)}
            >
          <ListItemText id={labelId} primary={user} />
          <ListItemSecondaryAction>
              <Button
              key={index}
                edge="end"
                onClick={event=> this.handleToggle()}
              >Remove</Button>
            </ListItemSecondaryAction>
            </ListItem>
                <Divider />
                </div>
            );
        })
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.state.membersModal}
                    onHide={this.cancelList}
                    animation={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>List Members</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{}}>
                            <List component="nav" aria-label="secondary mailbox folder">
                                {this.getList()}
                            </List>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(listMembers);
