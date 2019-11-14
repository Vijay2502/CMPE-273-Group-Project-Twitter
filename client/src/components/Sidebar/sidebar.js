import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHashtag,
  faBell,
  faEnvelope,
  faBookmark,
  faListAlt,
  faUserCircle,
  faEllipsisH,
  faImage
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import "./sidebar.css";
// import "../../images/home.png";
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { openTweetModal: false };
    this.newTweet = this.newTweet.bind(this);
    this.cancelTweet = this.cancelTweet.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }
  onFileChange(files) {
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

  newTweet = e => {
    this.setState({ openTweetModal: true });
  };
  cancelTweet = e => {
    this.setState({ openTweetModal: false });
  };
  render() {
    return (
      <div class="sidebar-container row">
        <div class="col-sm-3 sidebar">
          <div class="list-group sidebar-list col-sm-5">
            <div className="twitter-icon">
              <FontAwesomeIcon icon={faTwitter} />
            </div>

            <button
              type="button"
              class="list-group-item list-group-item-action borderless sidebar-button"
            >
              {/* <img src={require("../../images/home.png")} height="35" /> */}
              <FontAwesomeIcon icon={faHome} />
              <span>Home</span>
            </button>
            <button
              type="button"
              class="list-group-item list-group-item-action borderless"
            >
              {/* <img src={require("../../images/explore.png")} height="35" /> */}
              <FontAwesomeIcon icon={faHashtag} />
              <span>Explore</span>
            </button>
            <button
              type="button"
              class="list-group-item list-group-item-action borderless"
            >
              <FontAwesomeIcon icon={faBell} />
              <span>Notification</span>
            </button>
            <button
              type="button"
              class="list-group-item list-group-item-action borderless"
            >
              {/* <img src={require("../../images/message.png")} height="35" /> */}
              <FontAwesomeIcon icon={faEnvelope} />
              <span>Messages</span>
            </button>
            <button
              type="button"
              class="list-group-item list-group-item-action borderless"
            >
              <FontAwesomeIcon icon={faBookmark} />
              <span>Bookmarks</span>
            </button>
            <button
              type="button"
              class="list-group-item list-group-item-action borderless"
            >
              <FontAwesomeIcon icon={faUserCircle} />
              <span>Profile</span>
            </button>
            <button
              type="button"
              class="list-group-item list-group-item-action borderless"
            >
              <FontAwesomeIcon icon={faListAlt} />
              <span>List</span>
            </button>
            <button
              type="button"
              class="list-group-item list-group-item-action borderless"
            >
              <FontAwesomeIcon icon={faEllipsisH} />
              <span>More</span>
            </button>
            <button
              type="button"
              onClick={this.newTweet}
              class="btn btn-primary submit-btn"
            >
              <span>Tweet</span>
            </button>
          </div>
        </div>
        <div class="col-sm-9"></div>
        <Modal
          show={this.state.openTweetModal}
          onHide={this.cancelTweet}
          animation={false}
        >
          <Modal.Header closeButton></Modal.Header>

          <Modal.Body>
            <form>
              <div class="tweet-container row">
                <div class="col-sm-1">
                  <img
                    src={require("../../images/profile.png")}
                    height="35"
                    width="35"
                  />
                </div>
                <div class="text-area-container col-sm-11">
                  <textarea
                    class="form-control text-area"
                    id="message-text"
                  ></textarea>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <div className="image-icon">
              <input
                class="image-btn"
                type="file"
                accept="image/*"
                id="img-upload"
                onClick={e => this.onFileChange(e.target.files)}
              ></input>

              <label for="img-upload">
                <FontAwesomeIcon icon={faImage} />
              </label>
            </div>
            <div class="btn-tweet">
              <button class="btn btn-primary submit-btn" type="button">
                Tweet
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Sidebar;
