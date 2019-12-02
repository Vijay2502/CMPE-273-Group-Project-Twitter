import {GET_TOP_TEN_TWEETS_BY_VIEWS, GET_TOP_TEN_TWEETS_BY_LIKES, GET_TOP_TEN_TWEETS_BY_RETWEETS} from "../constants/actionTypes";

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
            //topTenTweetsByViews: action.payload.data.res,

            topTenTweetsByViews: action.payload.data.res.map((tweet, index) => {
                const tweetCustom = {};

                tweetCustom.data = tweet.tweet.data;
                tweetCustom.likes = tweet.likes;
                tweetCustom.retweetCount = tweet.retweetCount;
                return tweetCustom;
            })
        });
    } else if (action.type === GET_TOP_TEN_TWEETS_BY_LIKES) {
        return Object.assign({}, state, {
            topTenTweetsByLikes: action.payload.tweets,
        });
    } else if (action.type === GET_TOP_TEN_TWEETS_BY_RETWEETS) {
        return Object.assign({}, state, {
            //topTenTweetsByRetweets: action.payload.tweets,
            topTenTweetsByRetweets: action.payload.tweets.map((tweet, index) => {
                const tweetCustom = {};


                tweetCustom.data = tweet.data;
                tweetCustom.likes = tweet.likes;
                tweetCustom.retweetCount = tweet.retweetCount;
                return tweetCustom;
            })
        });
    }

    return state;
}