import {GET_TOP_TEN_TWEETS_BY_VIEWS, GET_TOP_TEN_TWEETS_BY_LIKES, GET_TOP_TEN_TWEETS_BY_RETWEETS} from "../../redux/constants/actionTypes";
import {HOSTNAME} from "../../constants/appConstants";
import axios from 'axios';

export function getTopTenTweetsByViews(payload) {
    console.log("getTop10TweetsByView payload");
    console.log(payload);

    return (dispatch) => {
        axios.get(`http://${HOSTNAME}:8080/api/v1/analytics/user/${payload.ownerId}/tweets/by-views`, payload)
            .then((response) => dispatch(getTopTenTweetsByViewsDispatch(response.data)));
    }
}

export const getTopTenTweetsByViewsDispatch = (returnData) => {
    console.log("Inside getTop10TweetsByViewDispatch dispatch");
    console.log(returnData);
    return {type: GET_TOP_TEN_TWEETS_BY_VIEWS, payload: returnData}
};

export function getTopTenTweetsByLikes(payload) {
    console.log("getTop10TweetsByView payload");
    console.log(payload);

    return (dispatch) => {
        axios.post(`http://${HOSTNAME}:3001/access/login`, payload)
            .then((response) => dispatch(getTopTenTweetsByLikesDispatch(response.data)));
    }
}

export const getTopTenTweetsByLikesDispatch = (returnData) => {
    console.log("Inside getTop10TweetsByViewDispatch dispatch");
    console.log(returnData);
    return {type: GET_TOP_TEN_TWEETS_BY_LIKES, payload: returnData}
};

export function getTopTenTweetsByRetweets(payload) {
    console.log("getTop10TweetsByView payload");
    console.log(payload);

    return (dispatch) => {
        axios.post(`http://${HOSTNAME}:3001/access/login`, payload)
            .then((response) => dispatch(getTopTenTweetsByRetweetsDispatch(response.data)));
    }
}

export const getTopTenTweetsByRetweetsDispatch = (returnData) => {
    console.log("Inside getTop10TweetsByViewDispatch dispatch");
    console.log(returnData);
    return {type: GET_TOP_TEN_TWEETS_BY_RETWEETS, payload: returnData}
};

