import React, { Component } from 'react';
import { PullToRefresh, PullDownContent, ReleaseContent, RefreshContent } from "react-js-pull-to-refresh";
import '../../css/list.css'

class SearchView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users:
        [
        ],
      isOwner: true,
      isSubscriber: false,
      isMember:false
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
  showOwnerBox() {
    this.setState({isOwner: true, isSubscriber: false,isMember:false});
  }

  showSubscriberBox(){
    this.setState({isOwner: false, isSubscriber: true,isMember:false});
  }

showMemberBox() {
  this.setState({isOwner: false, isSubscriber: false,isMember:true});
}

  showContent(){
   let content = this.state.users.map((user, index) => {
      let name = `${user.name.first} ${user.name.last}`
      let handle = `@${user.name.first}${user.name.last}`
      let image = user.image
      let tweet = user.tweet
      console.log(image)
      return (
   <TweetBody
            key={index}
            name={name}
            handle={handle}
            tweet={tweet}
            image={image} />
        
      )
    })
    return content;
  }


  render() {
    return (
      <PullToRefresh
        pullDownContent={<PullDownContent />}
        releaseContent={<ReleaseContent />}
        refreshContent={<RefreshContent />}
        pullDownThreshold={2}
        onRefresh={this.handleRefresh}
        triggerHeight={50}
        backgroundColor='black'>
        <div className="main-body">
        <div className="list-body">
      <div className="box-controller">
       <div
         className={"controller " + (this.state.isOwner
         ? "selected-controller"
         : "")}
         onClick={this
         .showOwnerBox
         .bind(this)}>
         Latest
       </div>
       <div
         className={"controller " + (this.state.isSubscriber
         ? "selected-controller"
         : "")}
         onClick={this
         .showSubscriberBox
         .bind(this)}>
         People
       </div>
       <div
         className={"controller " + (this.state.isMember
         ? "selected-controller"
         : "")}
         onClick={this
         .showMemberBox
         .bind(this)}>
         Photos
       </div>
       <div
         className={"controller " + (this.state.isMember
         ? "selected-controller"
         : "")}
         onClick={this
         .showMemberBox
         .bind(this)}>
         Videos
       </div>
     </div>
    </div>
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

