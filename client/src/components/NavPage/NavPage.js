import React, { Component } from 'react';
import {Redirect} from 'react-router';
import { PullToRefresh, PullDownContent, ReleaseContent, RefreshContent } from "react-js-pull-to-refresh";

class NavPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <Redirect to="/home"/>
    );
  }
}

export default NavPage;

