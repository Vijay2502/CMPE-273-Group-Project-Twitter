import React, { Component } from 'react';
import '../css/list.css'
import Sidebar from './Sidebar/sidebar'
import HomeTweetList from './HomeTweetList/list'
import Tweet from "./Tweet/Tweet";
import GridLayout from 'react-grid-layout';

class HomePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
          <div key="a" data-grid={{x: 0, y: 0, w: 5, h: 2, static: true}}><Sidebar/></div>

          <div key="b" data-grid={{x: 10, y: 0, w: 8, h: 2, static: true}}>
            <h2>Home</h2>
            <Tweet/>
            <HomeTweetList/>
          </div>
        </GridLayout>
    );
  }
}

export default HomePage;

