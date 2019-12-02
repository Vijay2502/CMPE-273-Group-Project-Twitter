import React from 'react';
import {Form,Modal} from "react-bootstrap";
import "../Messages/messagelist.css";
import AssignmentSharpIcon from '@material-ui/icons/AssignmentSharp';
import IconButton from '@material-ui/core/IconButton';
import {createList,addMem} from "../../redux/actions/listActions";
import {connect} from "react-redux";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import axios from 'axios';
import image from '../../images/profile.png';
function mapStateToProps(store) {
    return {
        currentList : store.list.currentList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createList: (payload) => dispatch(createList(payload)),
        addMem : (payload) => dispatch(addMem(payload))
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
            search:[],
            chipData:[],
            buttonVal:false
        }
        this.handleChange = this.handleChange.bind(this);
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
            "userId":localStorage.getItem("id"),
            "name": this.state.name,
            "description" : this.state.description,
            "data":{
                "username":localStorage.getItem("username"),
                "firstName":localStorage.getItem("firstName"),
                "lastName":localStorage.getItem("lastName"),
                "userId":localStorage.getItem("id"),
            }
        }
        this.props.createList(payload);
    }
        this.nextModal();
        this.setState({openListModal: false});
    };
    handleChange(e) {
        this.setState({ 
            [e.target.name]: e.target.value 
        });
      }
    handleSearch = (e) => {
        e.preventDefault();
        this.getUser(e.target.value);
        console.log("testing search");
    };
   handleDelete = chipToDelete => () => {
       let chips= this.state.chipData
        this.setState({
            chipData : chips.filter(chip => chip.key !== chipToDelete.key)
        })
      };
   handleAdd= (e,user) => {
       e.preventDefault();
       console.log("handleADD",user);
    
    let chips= this.state.chipData
        let newMember = { key : chips.length,label:user.username,id:user.id}
        chips.push(newMember);
        console.log(chips);
        this.setState({
            chipData : chips
        });

      };
   handleAddMembers = () =>{
    this.setState({addMemberModal: false});
       let payload = {
           "userId":1,
           "id":2,
           "memberId":this.state.chipData
       }
       this.props.addMem(payload);
   }

    getUser = (test) => {
        console.log("getuser",test);
        axios.get(`http://localhost:8080/api/v1/search/users?text=test`)
        .then(response => {
            this.setState(
                {
                     search: response.data.data.users
                }, () => console.log('message response',this.state.search)
            );
        })
        .catch(err => {
            console.error(err);
        });
    };

    render() {
        let searchList = null;
        if (this.state.search.length > 0) {
            console.log("here");
            searchList = this.state.search.map(user => {
                return (
                    <div class="list-group">
                        <div class="list-group-item list-group-item-action user-list row">
                            <div class="image-container col-sm-2"><img class="profile-image" alt="avatar"></img></div>
                            <div class="col-sm-10">
                                <button onClick={(e) => this.handleAdd(e,user)}>
                                <div class="profile-email">{user.username}</div> 
                                <div class="profile-name">{user.firstName + " " + user.lastName}</div>
                                </button>
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
                <input name='name' label='Name' placeholder='Name' onChange={this.handleChange}  value={this.state.name} />
               <input name='description' label='Description' placeholder='Description' onChange={this.handleChange}  value={this.state.description} />
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
                                onClick={this.handleAddMembers}
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
                                {/* <FontAwesomeIcon icon={faSearch} /> */}
                                <input type="text" placeholder="Search people"/>
                                    {/* <FontAwesomeIcon icon={faSearch} /> */}
                                <div class="search-result">{searchList}</div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateList);
