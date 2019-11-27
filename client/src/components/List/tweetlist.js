import React, { Component } from "react";
import "../Profile/profile.css";
import ViewTweets from "../Tweet/ViewTweets";
import GridLayout from 'react-grid-layout';
import Search from '../List/search';
import Sidebar from '../Sidebar/sidebar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
////////////////////// REDUX CODE //////////////////////
// function mapStateToProps(store) {
//   return {
//     profile_image: store.login.profile_image
//   };
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     getResProfile: data => dispatch(getResProfile(data))
// }

class tweetlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editProfile: false, //for modal
      listName: "Cast and Crew",
      userName: "@SiliconHBO",
      name: "SiliconValley",
      users: [],
      isSubscribed:false
    };
  }
  componentWillMount = () => {
    this.getUser()
  }

  getUser = () => {
    fetch('https://randomuser.me/api/')
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Request failed.');
      })
      .then(data => {
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
      })
      .catch(error => {
        console.log(error);
      });
  }
  editProfile = () => {
    this.setState({ editProfile: true });
  };

  componentDidMount() {
    ///////////// USER CODE TO GO HERE ////////////////////
    // const email = localStorage.getItem("email_id");
    // const data = {
    // email_id: email
    // };
    // console.log("data    " + JSON.stringify(data));
    // this.props.getProfile(data);
  }

  cancelEdit = () => {
    this.setState({ editProfile: false });
  };
  saveProfile = () => {
    // save profile code
    this.setState({ editProfile: false });
  };

  handleClick(flag){
     this.state.isSubscribed=flag;
  }
  getSubscribeButton = () =>{
    if (this.state.isSubscribed) {
     return  <button onClick={this.handleClick(true)}
         className="button signup-style search-follow-button">Unsubscribe</button>;
    } else {
     return <button onClick={this.handleClick(false)}
        className="button signup-style search-follow-button">Subscribe</button>;
    }
  }

  render() {
    return (
      <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
                <div key="a" data-grid={{x: 0, y: 0, w: 5, h: 2, static: true}}>
                    <Sidebar parentCallback={this.callbackFunction}/>
                </div>
                <div key="b" data-grid={{x: 10, y: 0, w: 8, h: 2, static: true}}>
      <div class="profile-container col-sm-10">
        <div class="top-details row">
          <div class="offset-sm-1">
            <div class="profile-name-header">{this.state.listName}</div>
            <div class="profile-tweets-header">{this.state.userName}</div>
          </div>
        </div>
        <div class="profile-cover-pic row">
          <img
            src={require("../../static/images/cover_pic1.png")}
            width="100%"
            height="200px"
          />
        </div>
        <div class="profile-details row">
          <div class="col-sm-12">
            <div class="profile-name-header ">{this.state.listName}</div>
            <div class="followers-following row">
              <div class="profile-detail-font">{this.state.name}</div>
              <div class="profile-detail-font">{this.state.userName}</div>
            </div>
            <div>{this.getSubscribeButton}</div>
            <div class="followers-following row">
              <div class="col-sm-2 profile-detail-font">{"2"} Following</div>
              <div class="col-sm-2 profile-detail-font">{"2"} Following</div>
            </div>
          </div>
        </div>
        <div class="heading row"><div class="tweets-heading col-sm-2">Tweets</div></div>
        <div class="tweets-list" row>
          <ViewTweets dataFromParent={this.state.users} />
        </div>
      </div>
     </div>
      <div key="c" data-grid={{x: 5, y: 0, w: 6, h: 2, static: true}}><Search/></div>
</GridLayout>
    );
  }
}

export default tweetlist;
/////////////////////// CALL FOR REDUX ACTION ///////////////////
// export default connect(mapStateToProps,mapDispatchToProps)(profile);
