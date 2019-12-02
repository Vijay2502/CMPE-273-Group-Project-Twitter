import React, { Component } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import "./profile.css";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import ViewTweets from "../Tweet/ViewTweets";
import { getProfile, getfollowees, getfollowers } from "../../redux/actions/userActions";
import { getTweetsById } from "../../redux/actions/tweetsActions";


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
            selectedCoverPic: "",
            selectedProfilePic: "",
            users: []
        };
        this.onCoverPicUpload = this.onCoverPicUpload.bind(this);
        this.onProfilePicUpload = this.onProfilePicUpload.bind(this);
    }
    componentWillMount = () => {
        const data = {
            user_id: 1
        }; const data0 = {
            user_id: 1212
        };
        this.props.getProfileDetails(data);
        this.props.getUserTweets(data);
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
    saveProfile = (e) => {
        // save profile code
        e.preventDefault();
        const Updatedata = {};
        for (let i = 0; i < e.target.length; i++) {
            if (e.target[i].id !== "") {
                Updatedata[e.target[i].id] = e.target[i].value;
            }
        }
        // console.log(JSON.stringify(data));
        let dataFinal = {
            firstName: Updatedata.formGridFName,
            lastName: Updatedata.formGridLName,
            data: {
                website: Updatedata.formGridWebsite,
                location: Updatedata.formGridLocation,
                bio: Updatedata.formGridBio
            }
        };
        console.log("Res data ", dataFinal);
        // const data = new FormData();
        // if (this.state.selectedCoverPic) {
        //     data.append('image', this.state.selectedCoverPic, this.state.selectedCoverPic.name);
        //     axios.post(API_PATH + '/img-upload', data, {
        //         headers: {
        //             'accept': 'application/json',
        //             'Accept-Language': 'en-US,en;q=0.8',
        //             'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        //             'Authorization': localStorage.getItem('token')
        //         }
        //     }).then()
        // }






        // this.props.updateApi(data);
        // this.setState({ editProfile: false });
    };
    onCoverPicUploadHandler = (event) => {
        this.setState({
            selectedCoverPic: event.target.files[0]
        });
    };
    onCoverPicUpload(files) {
        console.log("onFileChange event triggered");
        // if (files == null || files.length == 0) return;
        // let file = files[0];
        // const data = new FormData();
        // data.append("image", file, file.name);
        // var headers = {
        //   "Content-Type": "application/json",
        //   Authorization: "Bearer " + sessionStorage.getItem("token")
        // };
        // axios
        //   .post(`http://` + connectionUrl + `/image/${email_id}/imgupload`, data, {
        //     headers: headers
        //   })
        //   .then(res => {
        //     if (res.status === 200) {
        //       this.setState({ profile_image: res.data.imageUrl.imageUrl });
        //       console.log("success", this.state.profile_image);
        //     }
        //   })
        //   .catch(err => console.error(err));
        console.log("image uploading code. ");
    }

    onProfilePicUpload(files) {
        console.log("onFileChange event triggered");
        // if (files == null || files.length == 0) return;
        // let file = files[0];
        // const data = new FormData();
        // data.append("image", file, file.name);
        // var headers = {
        //   "Content-Type": "application/json",
        //   Authorization: "Bearer " + sessionStorage.getItem("token")
        // };
        // axios
        //   .post(`http://` + connectionUrl + `/image/${email_id}/imgupload`, data, {
        //     headers: headers
        //   })
        //   .then(res => {
        //     if (res.status === 200) {
        //       this.setState({ profile_image: res.data.imageUrl.imageUrl });
        //       console.log("success", this.state.profile_image);
        //     }
        //   })
        //   .catch(err => console.error(err));
        console.log("image uploading code. ");
    }

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
                        <img src={userData.profilePic ? userData.profilePic : require("../../static/images/profile_pic.png")} height="120" />
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
                        <div class="profile-name-header ">{usrDetails.firstName ? usrDetails.firstName : "" + " " + usrDetails.lastName ? usrDetails.lastName : ""}</div>
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
                            <button
                                class="btn btn-primary save-btn"
                                type="button"

                            // onClick={this.saveProfile}
                            >
                                Save
                            </button>
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
                                    id="proile-pic-upload"
                                    // onClick={e => this.onCoverPicUpload(e.target.files)}
                                    onChange={this.onCoverPicUploadHandler}
                                ></input>

                                <label for="proile-pic-upload">
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
                                    onClick={e => this.onProfilePicUpload(e.target.files)}
                                ></input>

                                <label for="proile-pic-upload">
                                    <img
                                        src={userData.profilePic ? userData.profilePic : require("../../static/images/profile_pic.png")}
                                        height="80px"
                                    />
                                </label>
                            </div>
                        </div>
                        <div class="edit-details-form">
                            <Form onSubmit={this.saveProfile}>
                                <Button variant="primary" type="submit">submit</Button>
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
