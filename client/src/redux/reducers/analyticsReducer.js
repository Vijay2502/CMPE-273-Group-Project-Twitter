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
        const tweets = action.payload.data.res.map((tweet) => {
            const tweetCustom = {};
            tweetCustom.data = tweet.tweet.data;

            return tweetCustom;
        });

        const dataPoints = action.payload.data.res.map((tweet, index) => {
            const yxValues = {};

            yxValues["y"] = tweet.numOfViews;
            yxValues["label"] = "Tweet " + index;
            return yxValues;
        });

        const response = {};
        response.tweets = tweets;
        response.dataPoints = dataPoints;

        return Object.assign({}, state, {
            topTenTweetsByViews: response
        });
    } else if (action.type === GET_TOP_TEN_TWEETS_BY_LIKES) {
        const tweets = action.payload.data.res.map((tweet) => {
            const tweetCustom = {};
            tweetCustom.data = tweet.tweet.data;

            return tweetCustom;
        });

        const dataPoints = action.payload.data.res.map((tweet, index) => {
            const yxValues = {};

            yxValues["y"] = tweet.numOfLikes;
            yxValues["label"] = "Tweet " + index;
            return yxValues;
        });

        const response = {};
        response.tweets = tweets;
        response.dataPoints = dataPoints;

        return Object.assign({}, state, {
            topTenTweetsByLikes: response
        });
    } else if (action.type === GET_TOP_TEN_TWEETS_BY_RETWEETS) {
        const tweets = action.payload.data.res.map((tweet) => {
            const tweetCustom = {};

            tweetCustom.data = tweet.tweet.data;
            return tweetCustom;
        });

        const dataPoints = action.payload.data.res.map((tweet, index) => {
            const yxValues = {};

            yxValues["y"] = tweet.tweet.retweetCount;
            yxValues["label"] = "Tweet " + (index + 1);
            return yxValues;
        });

        const response = {};
        response.tweets = tweets.slice(0, 5);
        response.dataPoints = dataPoints.slice(0, 5);

        return Object.assign({}, state, {
            topTenTweetsByRetweets: response,
        });
    }

    return state;
}