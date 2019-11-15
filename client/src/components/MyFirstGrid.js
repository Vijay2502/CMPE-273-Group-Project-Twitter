import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';
import HomePage from "./HomePage";
import Sidebar from './Sidebar/sidebar'
import HomeTweetList from './HomeTweetList/list'

class MyFirstGrid extends Component {
    render() {
        return (
            <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
                <div key="a" data-grid={{x: 0, y: 0, w: 5, h: 2, static: true}}><Sidebar/></div>
                <div key="b" data-grid={{x: 10, y: 0, w: 8, h: 2, static: true}}><HomeTweetList/></div>
            </GridLayout>
        )
    }
}
export default MyFirstGrid;