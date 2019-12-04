import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Button, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserComponent from './UserComponent'
import InfiniteScroll from 'react-infinite-scroller';

class UserList extends Component {
  state = {
    users: this.props.users
  }

  render() {
    {console.log("UserList user", this.state.users)}
    var userRows = this.state.users.map(user => {
      return (<UserComponent
        key={user.id}
        callerId={this.props.profile}
        user={user}
      />)
    });
    return (<Col>
      <InfiniteScroll
        pageStart={0}
        loadMore={this.props.getUsers}
        hasMore={this.props.hasMore}
        loader={<div className="loader" key={0}>Loading ...</div>}
        useWindow={false}
      >
        {userRows}
      </InfiniteScroll>
    </Col>)
  }
}



export default UserList;