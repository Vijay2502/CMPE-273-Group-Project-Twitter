import React, { Component } from 'react';
import { Modal, Col } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';
import { UserRow } from './userRow';
import TweetBody from "../HomeTweetList/listview";
import '../../css/list.css';
import axios from 'axios';
import { HOSTNAME } from "../../constants/appConstants";
const API_PATH = `http://${HOSTNAME}:8080`

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

    this.handleRefresh = this.handleRefresh.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.peopleBox = this.peopleBox.bind(this);
    this.getTopics = this.getTopics.bind(this);
    this.latestBox = this.latestBox.bind(this);
    this.getLists = this.getLists.bind(this);
    this.listsBox = this.listsBox.bind(this);
    this.switch = this.switch.bind(this);
  }

  componentWillMount() {
    this.getUser();
    this.getLists();
    this.getTopics();
  }

  getUsers() {
    axios.get(API_PATH + `/search/users?text=${this.props.text}&limit=10&offset=${this.state.users.nextOffset}`).then(res => {
      if (res.data && res.data.data && res.data.data.users && res.data.data.nextOffset >= 0) {
        this.setState({
          users: {
            nextOffset: res.data.data.nextOffset,
            records: this.state.users.records.concat(res.data.data.users)
          }
        });
      }

    }).catch(err => {
      console.log(err);
    })
  }

  getTopics() {
    axios.get(API_PATH + `/search/topics?text=${this.props.text}&limit=10&offset=${this.state.tweets.nextOffset}`).then(res => {
      if (res.data && res.data.data && res.data.data.tweets && res.data.data.nextOffset >= 0) {
        this.setState({
          tweets: {
            nextOffset: res.data.data.nextOffset,
            records: this.state.tweets.records.concat(res.data.data.tweets)
          }
        });
      }

    }).catch(err => {
      console.log(err);
    })
  }

  getLists() {
    axios.get(API_PATH + `/search/lists?text=${this.props.text}&limit=10&offset=${this.state.lists.nextOffset}`).then(res => {
      if (res.data && res.data.data && res.data.data.lists && res.data.data.nextOffset >= 0) {
        this.setState({
          lists: {
            nextOffset: res.data.data.nextOffset,
            records: this.state.lists.records.concat(res.data.data.lists)
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

  showListBox() {
    this.setState({ isLatest: false, isPeople: false, isLists: true });
  }


  peopleBox() {
    var userRows = this.state.users.records.map(user => {
      return (<UserRow
        key={user.id}
        user={user}
      />)
    });
    return (<Col>
      <InfiniteScroll
        pageStart={0}
        loadMore={this.getUsers}
        hasMore={this.state.users.nextOffset != 0}
        loader={<div className="loader" key={0}>Loading ...</div>}
        useWindow={false}
      >
        {userRows}
      </InfiniteScroll>
    </Col>)

  }

  latestBox() {
    var tweetBodies = this.state.tweets.records.map(tweet => {
      return (<TweetBody
        key={tweet.id}
        name={tweet.owner.firstName + " " + tweet.owner.lastName}
        handle={`@${tweet.owner.username}`}
        tweet={tweet.data.text}
        image={tweet.data.image} />)
    });
    return (<Col>
      <InfiniteScroll
        pageStart={0}
        loadMore={this.getUser}
        hasMore={this.state.users.nextOffset != 0}
        loader={<div className="loader" key={0}>Loading ...</div>}
        useWindow={false}
      >
        {tweetBodies}
      </InfiniteScroll>
    </Col>)

  }

  listsBox() {
    var listBodies = this.state.lists.records.map(list => {
      return (<TweetBody
        key={list.id}
        name={list.name}
        handle={``}
        tweet={list.description}
        image={""} />)
    });
    return (<Col>
      <InfiniteScroll
        pageStart={0}
        loadMore={this.getUser}
        hasMore={this.state.users.nextOffset != 0}
        loader={<div className="loader" key={0}>Loading ...</div>}
        useWindow={false}
      >
        {listBodies}
      </InfiniteScroll>
    </Col>)
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

export default SearchView;

