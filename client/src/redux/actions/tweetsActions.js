import { CREATE_TWEET, GET_USER_TWEETS, LIKE_TWEET, RETWEET_TWEET } from "../../redux/constants/actionTypes";
import { HOSTNAME } from "../../constants/appConstants";
import axios from 'axios';

export function createTweet(payload) {
    console.log("createTweet payload");
    console.log(payload);

    return (dispatch) => {
        axios.post(`http://${HOSTNAME}:8080/api/v1/tweet/create`, payload)
            .then((response) => dispatch(createTweetDispatch(response.data)));
    }
}

export function retweetTweet(payload) {
    console.log("retweetTweet payload");
    console.log(payload);

    return (dispatch) => {
        axios.post(`http://${HOSTNAME}:8080/api/v1/tweet/${payload.tweetId}/retweet`, payload)
            .then((response) => dispatch(likeTweetDispatch(response.data)));
    }
}

export function likeTweet(payload) {
    console.log("likeTweet payload");
    console.log(payload);

    return (dispatch) => {
        axios.put(`http://${HOSTNAME}:8080/api/v1/tweet/${payload.userId}/like`, payload)
            .then((response) => dispatch(retweetTweetDispatch(response.data)));
    }
}

export function getTweetsById(data) {
    return function (dispatch) {
        // var headers = {
        //     "Content-Type": "application/json",
        //     Authorization: "Bearer " + sessionStorage.getItem("token")
        // };
        axios.defaults.withCredentials = true;
        axios
            .get(`http://${HOSTNAME}:8080/api/v1/tweet/byOwner/` + data.user_id)
            .then(response => dispatch(getUserTweets(response))).catch(err => { console.log(err); });
    };
}

function getUserTweets(returndata) {
    console.log("Inside getUserTweets - returndata: ", JSON.stringify(returndata));
    return { type: GET_USER_TWEETS, payload: returndata };
}

export const createTweetDispatch = (returnData) => {
    console.log("Inside createTweetDispatch");
    console.log(returnData);

    return { type: CREATE_TWEET, payload: returnData }
};

export const retweetTweetDispatch = (returnData) => {
    console.log("Inside retweetTweetDispatch");
    console.log(returnData);

    return { type: RETWEET_TWEET, payload: returnData }
};

export const likeTweetDispatch = (returnData) => {
    console.log("Inside likeTweetDispatch");
    console.log(returnData);

    return { type: LIKE_TWEET, payload: returnData }
};



