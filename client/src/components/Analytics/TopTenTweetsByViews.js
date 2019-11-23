import React, {Component} from 'react';
import {connect} from "react-redux";
import CanvasJSReact from '../../lib/canvasjs.react';
import {PullDownContent, PullToRefresh, RefreshContent, ReleaseContent} from "react-js-pull-to-refresh";
import {TweetBody} from "../HomeTweetList/listview";
import {getTopTenTweetsByViews} from "../../redux/actions/analyticsActions";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

function mapStateToProps(store) {
    return {
        topTenTweetsByViews: store.analytics.getTopTenTweetsByViews,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTopTenTweetsByViews: (payload) => dispatch(getTopTenTweetsByViews(payload))
    };
}

class TopTenTweetsByViews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    componentWillMount() {
        this.props.getTopTenTweetsByViews();
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
                text: "Top 10 tweets by views"
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
                    {y: 2200000000, label: "Tweet 1"},
                    {y: 1800000000, label: "Tweet 2"},
                    {y: 800000000, label: "Tweet 3"},
                    {y: 563000000, label: "Tweet 4"},
                    {y: 376000000, label: "Tweet 5"},
                    {y: 300000000, label: "Tweet 6"},
                    {y: 250000000, label: "Tweet 7"},
                    {y: 220000000, label: "Tweet 8"},
                    {y: 197000000, label: "Tweet 9"},
                    {y: 50000000, label: "Tweet 10"},
                ]
            }]
        };

        return (
            <div>
                <CanvasJSChart options={options}
                    /* onRef={ref => this.chart = ref} */
                />

                <div style={{width: 566}}>
                    <PullToRefresh
                        pullDownContent={<PullDownContent/>}
                        releaseContent={<ReleaseContent/>}
                        refreshContent={<RefreshContent/>}
                        pullDownThreshold={2}
                        onRefresh={this.handleRefresh}
                        triggerHeight={50}
                        backgroundColor='white'>

                        <div className="main-body">
                            {[...this.state.users].map((user, index) => {
                                let name = `${user.name.first} ${user.name.last}`;
                                let handle = `@${user.name.first}${user.name.last}`;
                                let image = user.image;
                                let tweet = user.tweet;
                                console.log(image);
                                return (
                                    <div>
                                        <h5>Tweet 1</h5>
                                        <TweetBody
                                            key={index}
                                            name={name}
                                            handle={handle}
                                            tweet={tweet}
                                            image={image}/>
                                    </div>
                                )
                            })}
                        </div>
                    </PullToRefresh>
                </div>
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopTenTweetsByViews);