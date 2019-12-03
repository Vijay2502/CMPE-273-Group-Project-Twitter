import React, { Component } from 'react';
import { connect } from "react-redux";
import CanvasJSReact from '../../lib/canvasjs.react';
import { getProfileViewData } from "../../redux/actions/analyticsActions";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

function mapStateToProps(store) {
    return {
        profileViewData: store.analytics.profileViewData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProfileViewData: (payload) => dispatch(getProfileViewData(payload))
    };
}

class ProfileViews extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        const payload = {};
        payload.ownerId = localStorage.getItem("id")
        this.props.getProfileViewData(payload);
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
                text: "Last 30 day user profile views"
            },
            axisX: {
                title: "Tweets",
                interval: 1
            },
            axisY: {
                title: "Number of views",
                labelFormatter: this.addSymbols,
            },
            data: [{
                type: "column",
                dataPoints: this.props.profileViewData
                // dataPoints: [
                //     { y: 1, label: "Tweet 1" },
                //     { y: 2, label: "Tweet 2" },
                //     { y: 3, label: "Tweet 3" },
                //     { y: 4, label: "Tweet 4" },
                //     { y: 4, label: "Tweet 5" },
                //     { y: 5, label: "Tweet 6" },
                //     { y: 1, label: "Tweet 7" },
                //     { y: 6, label: "Tweet 8" },
                //     { y: 1, label: "Tweet 9" },
                //     { y: 1, label: "Tweet 10" },
                // ]
            }]
        };

        return (
            <div>
                <CanvasJSChart options={options} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileViews);