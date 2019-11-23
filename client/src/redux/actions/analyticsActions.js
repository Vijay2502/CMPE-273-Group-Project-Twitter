import {CREATE_TWEET} from "../../redux/constants/actionTypes";
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
    localStorage.setItem('token', returnData.user.token);
    localStorage.setItem('_id', returnData.user._id);
    localStorage.setItem('userType', returnData.user.userType);
    return {type: CREATE_TWEET, payload: returnData}
};
