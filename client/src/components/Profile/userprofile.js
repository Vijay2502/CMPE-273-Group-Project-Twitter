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


class userprofile extends Component {
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
        // const data = {
        //     user_id: localStorage.getItem('id')
        // };

        // this.props.getProfileDetails(data);
        // this.props.getUserTweets({ user_id: 1 });
        // this.props.getUserfollowees(data);// ISSUE WITH API SO COMMENTING
        // this.props.getUserfollowers(data);// ISSUE WITH API SO COMMENTING
        // this.getUser();
    }

    componentDidMount() {
    }
    render() {
        console.log("checking props", JSON.stringify(this.props));
        return (
            <div class="profile-container col-sm-12">
                <div class="top-details row">
                    <div class="offset-sm-1">
                        <div class="profile-name-header">{this.props.firstName ? this.props.firstName : "Test"} {this.props.lastName ? this.props.lastName : "Test"}</div>
                        {/* <div class="profile-tweets-header">{tweetCount} tweets</div> */}
                    </div>
                </div>
                <div class="profile-cover-pic row">
                    <img
                        src={this.props.coverPic ? this.props.coverPic : require("../../static/images/cover_pic1.png")}
                        width="100%"
                        height="200px"
                    />
                </div>
                <div class="profile-pic-btn-container row">
                    <div class="profile-profile-pic col-sm-6">
                        <img src={this.props.ProfileImg ? this.props.ProfileImg : require("../../static/images/profile_pic.png")} height="120" width="120px" />
                    </div>
                    <div class="col-sm-6 edit-btn">
                        <button
                            type="button"
                            onClick={this.editProfile}
                            class="btn btn-primary edit-profile-btn"
                        >
                            Change according to props.......
                        </button>
                    </div>
                </div>
                <div class="profile-details row">
                    <div class="col-sm-12">
                        <div class="profile-name-header ">{this.props.firstName ? this.props.firstName : "test"} {this.props.lastName ? this.props.lastName : "Test"}</div>
                        <div class="profile-detail-font">@{this.props.username ? this.props.username : "test"}</div>
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
                            <div class="col-sm-3 profile-detail-font">{this.props.count ? this.props.count : 0} Followers</div>
                            <div class="offset-sm-1 col-sm-3 profile-detail-font">{this.props.count ? this.props.count : 0} Following</div>
                        </div>
                    </div>
                </div>
                <div class="heading row"><div class="tweets-heading col-sm-4">Tweets</div></div>
                <div class="tweets-list" row>
                    <ViewTweets dataFromParent={this.props.usrTweets ? this.props.usrTweets : []} />
                </div>
            </div>
        );
    }
}
export default userprofile;
