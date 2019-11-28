import { CREATE_TWEET, GET_USER_TWEETS } from "../../redux/constants/actionTypes";

const initialState = {
    createTweetSuccess: null,
    createTweetMessage: null,
    userTweets: null
};

export default function tweetReducer(state = initialState, action) {
    console.log("action.payload");
    console.log(action.payload);

    if (action.type === CREATE_TWEET) {
        return Object.assign({}, state, {
            createTweetSuccess: action.payload.signinSuccess,
            createTweetMessage: action.payload.signinMessage,
        });
    }
    if (action.type === GET_USER_TWEETS)
        return Object.assign({}, state, {
            userTweets: action.payload.data.data
        });
    return state;
}