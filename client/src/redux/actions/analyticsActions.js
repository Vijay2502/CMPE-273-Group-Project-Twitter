import {CREATE_TWEET, HOSTNAME} from "../constants/actionTypes";
import axios from 'axios';

export function getTop10TweetsByView(payload) {
    console.log("getTop10TweetsByView payload");
    console.log(payload);

    return (dispatch) => {
        axios.post(`http://${HOSTNAME}:3001/access/login`, payload)
            .then((response) => dispatch(getTop10TweetsByViewDispatch(response.data)));
    }
}

export const getTop10TweetsByViewDispatch = (returnData) => {
    console.log("Inside getTop10TweetsByViewDispatch dispatch");
    console.log(returnData);
    localStorage.setItem('token', returnData.user.token);
    localStorage.setItem('_id', returnData.user._id);
    localStorage.setItem('userType', returnData.user.userType);
    return {type: CREATE_TWEET, payload: returnData}
};
