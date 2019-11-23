import {GET_TOP_TEN_TWEETS_BY_VIEWS, GET_TOP_TEN_TWEETS_BY_LIKES, GET_TOP_TEN_TWEETS_BY_RETWEETS} from "../../redux/constants/actionTypes";
import {HOSTNAME} from "../../constants/appConstants";
import axios from 'axios';

export function getTopTenTweetsByView(payload) {
    console.log("getTop10TweetsByView payload");
    console.log(payload);

    return (dispatch) => {
        axios.post(`http://${HOSTNAME}:3001/access/login`, payload)
            .then((response) => dispatch(getTopTenTweetsByViewDispatch(response.data)));
    }
}

export const getTopTenTweetsByViewDispatch = (returnData) => {
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
            .then((response) => dispatch(getTopTenTweetsByLikesDispatch(response.data)));
    }
}

export const getTopTenTweetsByRetweetsDispatch = (returnData) => {
    console.log("Inside getTop10TweetsByViewDispatch dispatch");
    console.log(returnData);
    return {type: GET_TOP_TEN_TWEETS_BY_RETWEETS, payload: returnData}
};

