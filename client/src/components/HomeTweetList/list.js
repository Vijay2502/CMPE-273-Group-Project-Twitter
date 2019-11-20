import React, { Component } from 'react';
import { PullToRefresh, PullDownContent, ReleaseContent, RefreshContent } from "react-js-pull-to-refresh";
import '../../css/hometweetlist.css'
import { TweetBody } from './listview.js'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShareSquare, faRetweet, faImage} from "@fortawesome/free-solid-svg-icons";
import {faComment, faHeart} from "@fortawesome/free-regular-svg-icons";
import {Modal} from "react-bootstrap";
import Tweet from "../Tweet/Tweet";
// import Search from './search.js'

class HomeTweetList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      openCommentModal: false
    }

    this.handleRefresh = this.handleRefresh.bind(this)
    this.getUser = this.getUser.bind(this)
  }

  handleRefresh() {
    //dispatch
    return new Promise((resolve) => {
      this.getUser()
    });
  }
  componentWillMount() {
    this.getUser()
  }

  getUser() {
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

  openCommentModal = e => {
    this.setState({ openCommentModal: true });
  };

  closeCommentModal = e => {
    this.setState({ openCommentModal: false });
  };

  render() {
    console.log("render HomeTweetList")
    return (
        <div style={{width: 566}}>
          <PullToRefresh
              pullDownContent={<PullDownContent />}
              releaseContent={<ReleaseContent />}
              refreshContent={<RefreshContent />}
              pullDownThreshold={2}
              onRefresh={this.handleRefresh}
              triggerHeight={50}
              backgroundColor='white'>

            <div className="main-body">
              {[...this.state.users].map((user, index) => {
                let name = `${user.name.first} ${user.name.last}`
                let handle = `@${user.name.first}${user.name.last}`
                let image = user.image
                let tweet = user.tweet
                console.log(image)
                return (
                    <div>
                      <TweetBody
                          key={index}
                          name={name}
                          handle={handle}
                          tweet={tweet}
                          image={image} />

                      <div style={styles.container}>
                        <button
                            type="button"
                            className="list-group-item list-group-item-action borderless"
                            style={styles.reply}
                            onClick={this.openCommentModal}
                        >
                          <FontAwesomeIcon icon={faComment}/>
                        </button>
                        <button
                            type="button"
                            className="list-gr oup-item list-group-item-action borderless"
                            style={styles.retweet}
                        >
                          <FontAwesomeIcon icon={faRetweet}/>
                        </button>
                        <button
                            type="button"
                            className="list-group-item list-group-item-action borderless"
                            style={styles.like}
                        >
                          <FontAwesomeIcon icon={faHeart}/>
                        </button>
                        <button
                            type="button"
                            className="list-gr oup-item list-group-item-action borderless"
                            style={styles.share}
                        >
                          <FontAwesomeIcon icon={faShareSquare}/>
                        </button>

                        <Modal
                            show={this.state.openCommentModal}
                            onHide={this.closeCommentModal}
                            animation={false}
                            style={{width: 666}}
                        >
                          <Tweet/>
                        </Modal>
                      </div>
                    </div>
                )
              })}
            </div>
          </PullToRefresh>
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

export default HomeTweetList;

