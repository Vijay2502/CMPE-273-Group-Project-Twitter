import {CREATE_TWEET} from "../../redux/constants/actionTypes";
import {HOSTNAME} from "../../constants/appConstants";
import axios from 'axios';

export function createTweet(payload) {
    console.log("signInMongo payload");
    console.log(payload);

    return (dispatch) => {
        console.log("Inside signInMongo");

        axios.post(`http://${HOSTNAME}:3001/access/login`, payload)
            .then((response) => dispatch(createTweetDispatch(response.data)));
    }
}

export const createTweetDispatch = (returnData) => {
    console.log("Inside signIn dispatch");
    console.log(returnData);
    localStorage.setItem('token', returnData.user.token);
    localStorage.setItem('_id', returnData.user._id);
    localStorage.setItem('userType', returnData.user.userType);
    return {type: CREATE_TWEET, payload: returnData}
};
