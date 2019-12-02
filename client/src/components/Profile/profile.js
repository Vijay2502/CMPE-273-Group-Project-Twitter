import React, { Component } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import "./profile.css";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import ViewTweets from "../Tweet/ViewTweets";
import { getProfile, getfollowees, getfollowers } from "../../redux/actions/userActions";
import { getTweetsById } from "../../redux/actions/tweetsActions";
import axios from 'axios';


function mapStateToProps(store) {
    return {
        userDetails: store.users.userDetails,
        userTweets: store.tweets.userTweets,
        userFollowers: store.users.follower,
        userFollowee: store.users.followee
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getProfileDetails: data => dispatch(getProfile(data)),
        getUserTweets: data => dispatch(getTweetsById(data)),
        getUserfollowers: data => dispatch(getfollowers(data)),
        getUserfollowees: data => dispatch(getfollowees(data))

    }
}

class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editProfile: false, //for modal
            selectedCoverPic: null,
            selectedProfilePic: null,
            users: []
        };
        // this.onCoverPicUpload = this.onCoverPicUpload.bind(this);
        // this.onProfilePicUpload = this.onProfilePicUpload.bind(this);
    }
    componentWillMount = () => {
        const data = {
            user_id: localStorage.getItem('id')
        };

        this.props.getProfileDetails(data);
        this.props.getUserTweets({ user_id: 1 });
        this.props.getUserfollowees(data);// ISSUE WITH API SO COMMENTING
        this.props.getUserfollowers(data);// ISSUE WITH API SO COMMENTING
        this.getUser();
    }

    getUser = () => {
        fetch('https://randomuser.me/api/')
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('Request failed.');
            })
            .then(data => {
                for (let i = 0; i < 5; i++) {
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
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    editProfile = () => {
        this.setState({ editProfile: true });
    };

    componentDidMount() {
        // const email = localStorage.getItem("email_id");
        // const data = {
        //     user_id: 100
        // };
        // this.props.getProfileDetails(data);
    }

    cancelEdit = () => {
        this.setState({ editProfile: false });
    };
    onCoverPicUploadHandler = (event) => {
        // this.setState({
        //     selectedCoverPic: event.target.files[0]
        // });
        console.log("test onCoverPicUploadHandler");
    };
    onProfilePicUploadHandler = (event) => {
        this.setState({
            selectedProfilePic: event.target.files[0]
        });
        console.log("profile pic");
    };
    saveProfile = (e) => {
        // save profile code
        e.preventDefault();
        const Updatedata = {};
        for (let i = 0; i < e.target.length; i++) {
            if (e.target[i].id !== "") {
                Updatedata[e.target[i].id] = e.target[i].value;
            }
        }

        let dataFinal = {
            id: localStorage.getItem('id'),
            firstName: Updatedata.formGridFName,
            lastName: Updatedata.formGridLName,
            data: {
            }
        };

        const data = new FormData();
        if (this.state.selectedProfilePic) {
            console.log("inside if condition");
            data.append('image', this.state.selectedProfilePic, this.state.selectedProfilePic.name);
            axios.post('http://localhost:8080/api/v1/img-upload', data, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`
                    // 'Authorization': localStorage.getItem('token')
                }
            }).then((response) => {
                // console.log("Res data ", dataFinal);
                // dataFinal.data.ProfileImg = response.data.location;
                dataFinal.data = {
                    ProfileImg: response.data.location,
                    website: Updatedata.formGridWebsite,
                    location: Updatedata.formGridLocation,
                    bio: Updatedata.formGridBio
                };

                console.log("testing data with image:", dataFinal);

                axios.put('http://localhost:8080/api/v1/user/update', dataFinal)
                    .then(res => {
                        console.log("test result :", res);
                        if (res.data.status === "ok") {
                            alert("Profile updated successfully");
                            localStorage.setItem('firstName', res.data.data.user.firstName);
                            localStorage.setItem('lastName', res.data.data.user.lastName);
                            // store.dispatch(loadUser());
                            this.setState({
                                editProfile: false,
                                selectedProfilePic: res.data.data.user.data.ProfileImg
                                // user: res.data.user
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }).catch(err => {
                console.log(err);
            });
        } else {
            dataFinal.data = {
                ProfileImg: "",
                website: Updatedata.formGridWebsite,
                location: Updatedata.formGridLocation,
                bio: Updatedata.formGridBio
            };
            console.log("testing data wo image:", dataFinal);
            axios.put('http://localhost:8080/api/v1/user/update', dataFinal)
                .then(res => {
                    console.log(res);
                    if (res.data.status === "ok") {
                        alert("Profile updated successfully");
                        // store.dispatch(loadUser());
                        localStorage.setItem('firstName', res.data.data.user.firstName);
                        localStorage.setItem('lastName', res.data.data.user.lastName);
                        this.setState({
                            editProfile: false
                            // user: res.data.user
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    render() {
        console.log("checking props", JSON.stringify(this.props));
        let usrDetails = this.props.userDetails ? this.props.userDetails : [];
        let usrTweets = this.props.userTweets ? this.props.userTweets : [];
        let tweetCount = usrTweets.length ? usrTweets.length : 0;
        let usrFollower = this.props.userFollowers ? this.props.userFollowers : [];
        let usrFollowee = this.props.userFollowee ? this.props.userFollowee : [];
        let userData = usrDetails.data ? usrDetails.data : [];
        // console.log("usrFollowee length :", Object.keys(usrFollowee).length);

        console.log("checking tweetCount", tweetCount);
        return (
            <div class="profile-container col-sm-12">
                <div class="top-details row">
                    <div class="offset-sm-1">
                        <div class="profile-name-header">{usrDetails.firstName ? usrDetails.firstName : "" + " " + usrDetails.lastName ? usrDetails.lastName : ""}</div>
                        <div class="profile-tweets-header">{tweetCount} tweets</div>
                    </div>
                </div>
                <div class="profile-cover-pic row">
                    <img
                        src={userData.coverPic ? userData.coverPic : require("../../static/images/cover_pic1.png")}
                        width="100%"
                        height="200px"
                    />
                </div>
                <div class="profile-pic-btn-container row">
                    <div class="profile-profile-pic col-sm-6">
                        <img src={userData.ProfileImg ? userData.ProfileImg : require("../../static/images/profile_pic.png")} height="120" width="120px" />
                    </div>
                    <div class="col-sm-6 edit-btn">
                        <button
                            type="button"
                            onClick={this.editProfile}
                            class="btn btn-primary edit-profile-btn"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
                <div class="profile-details row">
                    <div class="col-sm-12">
                        <div class="profile-name-header ">{usrDetails.firstName ? usrDetails.firstName : ""} {usrDetails.lastName ? usrDetails.lastName : ""}</div>
                        <div class="profile-detail-font">@{usrDetails.username ? usrDetails.username : ""}</div>
                        <div class="profile-dates row">
                            <div class="col-sm-4 profile-detail-font">
                                <FontAwesomeIcon icon={faBirthdayCake} />
                                <span> born {}</span>
                            </div>
                            <div class="col-sm-4 profile-detail-font">
                                <FontAwesomeIcon icon={faCalendarAlt} />
                                <span> Joined {}</span>
                            </div>
                        </div>
                        <div class="followers-following row">
                            <div class="col-sm-3 profile-detail-font">{usrFollower.count ? usrFollower.count : 0} Followers</div>
                            <div class="offset-sm-1 col-sm-3 profile-detail-font">{usrFollowee.count ? usrFollowee.count : 0} Following</div>
                        </div>
                    </div>
                </div>
                <div class="heading row"><div class="tweets-heading col-sm-4">Tweets</div></div>
                <div class="tweets-list" row>
                    <ViewTweets dataFromParent={usrTweets} />
                </div>

                <Modal
                    show={this.state.editProfile}
                    onHide={this.cancelEdit}
                    animation={false}
                    scrollable={true}
                >
                    <Modal.Header closeButton>
                        <div class="btn-tweet">
                            <label
                                for="submit-btn"
                                class="btn btn-primary save-btn"
                            // onClick={this.saveProfile}
                            >
                                Save
                            </label>
                        </div>
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div class="edit-profile-continer">
                            <div class="cover-pic-container row">
                                <input
                                    class="profile-pic-btn"
                                    type="file"
                                    accept="image/*"
                                    id="cover-pic-upload"
                                    // onClick={e => this.onCoverPicUpload(e.target.files)}
                                    onChange={this.onCoverPicUploadHandler}
                                ></input>

                                <label for="cover-pic-upload">
                                    <img
                                        src={userData.coverPic ? userData.coverPic : require("../../static/images/cover_pic1.png")}
                                        width="100%"
                                        height="180px"
                                    />
                                </label>
                            </div>
                            <div class="profile-pic-container row">
                                <input
                                    class="profile-pic-btn"
                                    type="file"
                                    accept="image/*"
                                    id="proile-pic-upload"
                                    onChange={this.onProfilePicUploadHandler}
                                // onClick={e => this.onProfilePicUploadHandler(e.target.files)}
                                ></input>

                                <label for="proile-pic-upload">
                                    <img
                                        src={userData.ProfileImg ? userData.ProfileImg : require("../../static/images/profile_pic.png")}
                                        height="80px"
                                        width="80px"
                                    />
                                </label>
                            </div>
                        </div>
                        <div class="edit-details-form">
                            <Form onSubmit={this.saveProfile}>
                                <button type="submit" id="submit-btn" class="hidden">submit</button>
                                <Form.Group controlId="formGridFName">
                                    <Form.Label>Firstname</Form.Label>
                                    <Form.Control
                                        // onChange={e => this.setState({ last_name: e.target.value })}
                                        placeholder={usrDetails.firstName ? usrDetails.firstName : ""}
                                    // value={this.props.firstName + " " + this.props.lastName}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formGridLName">
                                    <Form.Label>Lastname</Form.Label>
                                    <Form.Control
                                        // onChange={e => this.setState({ last_name: e.target.value })}
                                        placeholder={usrDetails.lastName ? usrDetails.lastName : ""}
                                    // value={this.props.firstName + " " + this.props.lastName}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formGridBio">
                                    <Form.Label>Bio</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows="3"
                                        placeholder={userData.location ? userData.location : "Add your Bio"}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formGridLocation">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control placeholder={userData.location ? userData.location : "Your Location"} />
                                </Form.Group>
                                <Form.Group controlId="formGridWebsite">
                                    <Form.Label>Website</Form.Label>
                                    <Form.Control placeholder={userData.website ? userData.website : "Add your Website"} />
                                </Form.Group>
                            </Form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(profile);
    // export default profile;
    /////////////////////// CALL FOR REDUX ACTION ///////////////////
