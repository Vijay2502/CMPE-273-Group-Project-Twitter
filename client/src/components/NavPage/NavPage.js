import React, { Component } from 'react';
import {Redirect} from 'react-router';

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

