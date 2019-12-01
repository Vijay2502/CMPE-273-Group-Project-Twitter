import React, { Component } from "react";
import "../Profile/profile.css";
import ViewTweets from "../Tweet/ViewTweets";
import GridLayout from 'react-grid-layout';
import Search from '../List/search';
import Sidebar from '../Sidebar/sidebar';
import { connect } from "react-redux";
import {getListById,getTweetByList} from "../../redux/actions/listActions";

function mapStateToProps(store) {
  return {
      currentList:store.list.currentList,
      feed: store.list.feed
  }
}

function mapDispatchToProps(dispatch) {
  return {
      getListById: (id) => dispatch(getListById(id)),
      getTweetByList: (id) => dispatch(getTweetByList(id))
  };
}

class tweetlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id : props.location.state.tweetId,
      editProfile: false, //for modal
      listName: "Cast and Crew",
      userName: "@SiliconHBO",
      name: "SiliconValley",
      users: [],
      isSubscribed: true,
      buttonText: "Subscribed",
      class: "btn btn-primary"
    };
    console.log("id sent from parent",this.state.id);
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount = () => {
    this.getUser()
  }

  getUser = () => {
    this.props.getListById(6);
    this.props.getTweetByList(6);
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

  componentDidMount() {
    ///////////// USER CODE TO GO HERE ////////////////////
    // const email = localStorage.getItem("email_id");
    // const data = {
    // email_id: email
    // };
    // console.log("data    " + JSON.stringify(data));
    // this.props.getProfile(data);
  }

  handleClick(flag) {
    this.setState({
      isSubscribed : flag
    })
    console.log(this.state.buttonText);
    this.setState({
      buttonText: (this.state.buttonText === "Subscribed") ? "Unsubscribed" : "Subscribed",
      class: (this.state.class === "btn btn-primary") ? "btn btn-outline-primary" : "btn btn-primary"
    })
  }

  render() {
    return (
      <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
        <div key="a" data-grid={{ x: 0, y: 0, w: 5, h: 2, static: true }}>
          <Sidebar parentCallback={this.callbackFunction} />
        </div>
        <div key="b" data-grid={{ x: 10, y: 0, w: 8, h: 2, static: true }}>
          <div class="profile-container col-sm-12">
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
              <div class="col-sm-9">
                <div class="profile-name-header ">{this.state.listName}</div>
                <div class="followers-following row">
                  <div class="profile-detail-font">{this.state.name}</div>
                  <div class="profile-detail-font">{this.state.userName}</div>
                </div>
                <div class="followers-following row">
                  <div class="col-sm-2 profile-detail-font">{"2"} Following</div>
                  <div class="col-sm-2 profile-detail-font">{"2"} Following</div>
                </div>
              </div>
            </div>
            <button type="button" class={this.state.class} onClick={() => this.handleClick(true)}>{this.state.buttonText}</button>
            <div class="heading row"><div class="tweets-heading col-sm-2">Tweets</div></div>
            <div class="tweets-list" row>
              <ViewTweets dataFromParent={this.state.users} />
            </div>
          </div>
        </div>
        <div key="c" data-grid={{ x: 5, y: 0, w: 6, h: 2, static: true }}><Search /></div>
      </GridLayout>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(tweetlist);
