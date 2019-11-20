import {CREATE_TWEET} from "../constants/actionTypes";

const initialState = {
    createTweetSuccess: null,
    createTweetMessage: null,
};

export default function tweetReducer(state = initialState, action) {
    console.log("action.payload")
    console.log(action.payload)

    if (action.type === CREATE_TWEET) {
        return Object.assign({}, state, {
            createTweetSuccess: action.payload.signinSuccess,
            createTweetMessage: action.payload.signinMessage,
        });
    }

    return state;
}