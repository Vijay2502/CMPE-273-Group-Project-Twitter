import {GET_TOP_TEN_TWEETS_BY_VIEWS} from "../constants/actionTypes";

const initialState = {
    topTenTweetsByViews: [],
    topTenTweetsByLikes: [],
    topTenTweetsByRetweets: [],
    numgerOfTweetsGraphs: [],
};

export default function getTopTenTweetsByViews(state = initialState, action) {
    console.log("action.payload");
    console.log(action.payload);

    if (action.type === GET_TOP_TEN_TWEETS_BY_VIEWS) {
        return Object.assign({}, state, {
            createTweetSuccess: action.payload.signinSuccess,
            createTweetMessage: action.payload.signinMessage,
        });
    }

    return state;
}