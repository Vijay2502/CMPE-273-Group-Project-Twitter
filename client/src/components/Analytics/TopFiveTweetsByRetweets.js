import React, { Component } from 'react';
import { connect } from "react-redux";
import CanvasJSReact from '../../lib/canvasjs.react';
import { PullDownContent, PullToRefresh, RefreshContent, ReleaseContent } from "react-js-pull-to-refresh";
import TweetBody from "../HomeTweetList/listview";
import { getTopTenTweetsByRetweets } from "../../redux/actions/analyticsActions";
import ViewTweets from "../Tweet/ViewTweets";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

function mapStateToProps(store) {
    return {
        topTenTweetsByRetweets: store.analytics.topTenTweetsByRetweets,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTopTenTweetsByRetweets: (payload) => dispatch(getTopTenTweetsByRetweets(payload))
    };
}

class TopFiveTweetsByRetweets extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        const payload = {};
        payload.ownerId = localStorage.getItem("id")
        this.props.getTopTenTweetsByRetweets(payload);
    }

    addSymbols(e) {
        var suffixes = ["", "K", "M", "B"];
        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if (order > suffixes.length - 1)
            order = suffixes.length - 1;
        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }


    render() {
        const options = {
            animationEnabled: true,
            theme: "light2",
            title: {
                text: "Top 5 tweets by retweets"
            },
            axisX: {
                title: "Tweets",
                reversed: true,
            },
            axisY: {
                title: "Number of views",
                labelFormatter: this.addSymbols
            },
            data: [{
                type: "bar",
                dataPoints: [
                    { y: 2200000000, label: "Tweet 1" },
                    { y: 1800000000, label: "Tweet 2" },
                    { y: 800000000, label: "Tweet 3" },
                    { y: 563000000, label: "Tweet 4" },
                    { y: 376000000, label: "Tweet 5" },
                ]
            }]
        };

        return (
            <div>
                <CanvasJSChart options={options}
                /* onRef={ref => this.chart = ref} */
                />
                <ViewTweets dataFromParent={this.props.topTenTweetsByRetweets} isDisableButtons={true}/>


                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopFiveTweetsByRetweets);