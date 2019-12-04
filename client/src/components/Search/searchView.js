import React, { Component } from 'react';
import { Modal, Col } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';
import { UserRow } from './User/UserBody';
import TweetBody from "../HomeTweetList/listview";
import ViewTweets from "../Tweet/ViewTweets";
import {connect} from "react-redux";
import {getTweetsById, likeTweet, retweetTweet, bookmarkTweet} from "../../redux/actions/tweetsActions";
import '../../css/list.css';
import axios from 'axios';
import UserList from './User/UserList';
import ListWindow from './List/ListWindow';
import Scroller from './Scroller';
import { HOSTNAME } from "../../constants/appConstants";
const API_PATH = `http://${HOSTNAME}:8080/api/v1`






class SearchView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: {
        nextOffset: 0,
        records: [

        ]
      },
      tweets: {
        nextOffset: 0,
        records: [

        ]
      },
      lists: {
        nextOffset: 0,
        records: [

        ]
      },
      isLatest: true,
      isPeople: false,
      isLists: false
    }

    this.getUsers = this.getUsers.bind(this);
    this.peopleBox = this.peopleBox.bind(this);
    this.getTopics = this.getTopics.bind(this);
    this.latestBox = this.latestBox.bind(this);
    this.getLists = this.getLists.bind(this);
    this.listsBox = this.listsBox.bind(this);
    this.switch = this.switch.bind(this);
  }

  componentWillMount() {
    this.getUsers(this.props.text, this.state.users.nextOffset);
    this.getLists(this.props.text, this.state.lists.nextOffset);
    this.getTopics(this.props.text, this.state.tweets.nextOffset);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps);
    if(nextProps.text != this.props.text){
      this.getUsers(nextProps.text,0);
      this.getLists(nextProps.text,0);
      this.getTopics(nextProps.text,0);
      this.showLatestBox();
    }
      return true;
  }

  getUsers(text, nextOffset) {
    console.log('getUsers',text, nextOffset)
    axios.get(API_PATH + `/search/users?text=${text}&limit=10&offset=${nextOffset}`).then(res => {
      if (res.data && res.data.data && res.data.data.users && res.data.data.nextOffset >= 0) {

        console.log(res.data.data);
        this.setState({
          users: {
            nextOffset: res.data.data.nextOffset,
            records: nextOffset==0?res.data.data.users:this.state.users.records.concat(res.data.data.users)
          }
        });
      }

    }).catch(err => {
      console.log(err);
    })
  }

  getTopics(text, nextOffset) {
    console.log('in getTopics')
    axios.get(API_PATH + `/search/topics?text=${text}&limit=10&offset=${nextOffset}`).then(res => {
      if (res.data && res.data.data && res.data.data.tweets && res.data.data.nextOffset >= 0) {
        console.log(res.data.data);
        this.setState({
          tweets: {
            nextOffset: res.data.data.nextOffset,
            records: nextOffset==0?res.data.data.tweets:this.state.tweets.records.concat(res.data.data.tweets)
          }
        });
      }

    }).catch(err => {
      console.log(err);
    })
  }

  getLists(text, nextOffset) {
    console.log('getLists')
    axios.get(API_PATH + `/search/lists?text=${text}&limit=10&offset=${nextOffset}`).then(res => {
      if (res.data && res.data.data && res.data.data.lists && res.data.data.nextOffset >= 0) {
        console.log(res.data.data);
        this.setState({
          lists: {
            nextOffset: res.data.data.nextOffset,
            records: nextOffset==0?res.data.data.lists:this.state.lists.records.concat(res.data.data.lists)
          }
        });
      }

    }).catch(err => {
      console.log(err);
    })
  }

  showLatestBox() {
    this.setState({ isLatest: true, isPeople: false, isLists: false });
  }

  showPeopleBox() {
    this.setState({ isLatest: false, isPeople: true, isLists: false });
  }

  showListsBox() {
    this.setState({ isLatest: false, isPeople: false, isLists: true });
  }


  peopleBox() {
    
    return (<UserList 
      users = {this.state.users.records}
      profile = {localStorage.getItem('id')}
      getUsers = {this.getUsers}
      hasMore = {this.state.users.nextOffset != 0}

    />)

  }

  latestBox() {

    return (<Col>
      <ViewTweets dataFromParent={this.state.tweets.records} />
    </Col>)

  }

  listsBox() {
    console.log(">>>>>>> props ",this.props)
    return (<ListWindow
      lists = {this.state.lists.records}
      profile = {localStorage.getItem('id')}
      getLists = {this.getLists}
      hasMore = {this.state.lists.nextOffset != 0}

    />)
  }

  switch() {
    if (this.state.isLatest) {
      return this.latestBox();
    } else if (this.state.isPeople) {
      return this.peopleBox();
    } else {
      return this.listsBox();
    }
  }



  render() {
    return (
      <div className="main-body">
        <div className="list-body">
          <div className="box-controller">
            <div
              className={"controller " + (this.state.isLatest
                ? "selected-controller"
                : "")}
              onClick={this
                .showLatestBox
                .bind(this)}>
              Latest
       </div>
            <div
              className={"controller " + (this.state.isPeople
                ? "selected-controller"
                : "")}
              onClick={this
                .showPeopleBox
                .bind(this)}>
              People
       </div>
            <div
              className={"controller " + (this.state.isLists
                ? "selected-controller"
                : "")}
              onClick={this
                .showListsBox
                .bind(this)}>
              Lists
       </div>

          </div>
        </div>
        {this.switch()}
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  reply: {
    //alignItems: "left",
  },
  retweet: {
    //alignItems: "center",
  },
  like: {
    //alignItems: "center",
  },
  share: {
    //alignItems: "right",
  }
};


export default (SearchView);

