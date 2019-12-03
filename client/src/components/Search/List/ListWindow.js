import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Button, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListComponent from './ListComponent'
import InfiniteScroll from 'react-infinite-scroller';

class ListWindow extends Component {
  state = {
    lists: this.props.lists
  }

  render() {

    var listRows = this.props.lists.map(list => {
      return (<ListComponent
        key={list.id}
        callerId={this.props.profile}
        list={list}
      />)
    });
    console.log('asdasdas',this.props.lists);
    return (<Col>
      <InfiniteScroll
        pageStart={0}
        loadMore={this.props.getLists}
        hasMore={this.props.hasMore}
        loader={<div className="loader" key={0}>Loading ...</div>}
        useWindow={false}
      >
        {listRows}
      </InfiniteScroll>
    </Col>)
  }
}



export default ListWindow;