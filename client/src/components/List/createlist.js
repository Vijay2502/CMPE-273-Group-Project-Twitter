import React from 'react';
import {Form,Modal} from "react-bootstrap";
import "../Messages/messagelist.css";
import AssignmentSharpIcon from '@material-ui/icons/AssignmentSharp';
import IconButton from '@material-ui/core/IconButton';
import {createList} from "../../redux/actions/listActions";
import {connect} from "react-redux";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

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

const PaperStyle = withStyles(theme => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      padding: theme.spacing(0.5),
    }
  }))(Paper);
  
const ChipStyle = withStyles(theme => ({
    chip: {
    margin: theme.spacing(0.5)
    }
  }))(Chip);

class CreateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openListModal: false,
            addMemberModal:false,
            name:"",
            description:"",
            search:"",
            chipData:[ { key: 0, label: 'sakshi' },  { key: 0, label: 'priya' }],
            buttonVal:false
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
        //call create api
        console.log("list name", this.state.name);
        console.log("list description", this.state.description);
        if(this.state.name!=undefined && this.state.description!=undefined){
        const payload ={
            "userId":6,
            "name": this.state.name,
            "descripton" : this.state.description
        }
        this.props.createList(payload);
    }
        this.nextModal();
        this.setState({openListModal: false});
    }
    createList=()=>{ 
    }

    handleChange(event, {name, value}) {
        this.setState({ [name]: value });
      }
    handleSearch = (e) => {
        e.preventDefault();
        this.getUser();
        console.log("testing search");
    }
   handleDelete = chipToDelete => () => {
       let chips= this.state.chipData
        this.setState({
            chipData : chips.filter(chip => chip.key !== chipToDelete.key)
        })
      };
   handleAdd = chipToAdd => (e) => {
    let chips= this.state.chipData
        let newMember = { key : this.state.chipData.length(),label:'Shim'}
        this.setState({
            chipData : chips.filter(chip => chips.push(newMember))
        })
      };
    getUser = () => {
        fetch('https://randomuser.me/api/')
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('Request failed.');
            })
            .then(data => {
                console.log("kjjsjk", JSON.stringify(data));
                for (let i = 0; i < 5; i++) {
                    this.setState({
                        search: [
                            {
                                name: data.results[0].name,
                                image: data.results[0].picture.medium,
                                email: data.results[0].email
                            },
                            ...this.state.search,
                        ]
                    });
                }

            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        let searchList = null;
        if (this.state.search.length > 0) {
            console.log("here");
            searchList = this.state.search.map(user => {
                console.log(JSON.stringify(user));
                return (
                    <div class="list-group">
                        <div class="list-group-item list-group-item-action user-list row">
                            <div class="image-container col-sm-2"><img src={user.image} class="profile-image" alt="avatar"></img></div>
                            <div class="col-sm-10">
                                <div class="profile-name">{user.name.first + " " + user.name.last}</div>
                                <div class="profile-email">{user.email}</div>
                                <div>chat - link</div>

                            </div>
                        </div>
                    </div>
                );
            });
        }
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
                                disabled={this.state.buttonVal}
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
                                        name="name"
                                        placeholder="name"
                                        value={this.state.listName}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formGridBio">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        name="description"
                                        as="textarea"
                                        rows="3"
                                        placeholder="description"
                                        value={this.state.Description}
                                        onChange={this.handleChange}
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
                    scrollable={true}
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
                       <div >
                        <PaperStyle>
                       {this.state.chipData.map(data => {
                            let icon;
        return (
          <ChipStyle
            key={data.key}
            icon={icon}
            label={data.label}
            onDelete={this.handleDelete(data)}
          />
        );
      })}
      
    </PaperStyle>
    </div>
                    </Modal.Header>
                    <Modal.Body>
                        <Form class="search-body" onSubmit={this.handleSearch}>
                            <Form.Group controlId="formBasicEmail">
                                {/* <FontAwesomeIcon icon={faSearch} /> */}
                                <Form.Control type="text" placeholder="Search people">
                                    {/* <FontAwesomeIcon icon={faSearch} /> */}
                                </Form.Control>
                                <div class="search-result">{searchList}</div>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateList);
