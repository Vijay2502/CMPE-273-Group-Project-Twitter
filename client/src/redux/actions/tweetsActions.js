import { CREATE_TWEET, GET_USER_TWEETS } from "../../redux/constants/actionTypes";
import { HOSTNAME } from "../../constants/appConstants";
import axios from 'axios';

export function createTweet(payload) {
    console.log("signInMongo payload");
    console.log(payload);

    return (dispatch) => {
        console.log("Inside signInMongo");

        axios.post(`http://${HOSTNAME}:8080/api/v1/tweet/create`, payload)
            .then((response) => dispatch(createTweetDispatch(response.data)));
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
