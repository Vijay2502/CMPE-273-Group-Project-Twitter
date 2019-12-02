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
            topTenTweetsByViews: action.payload.data.res.map((tweet, index) => {
                const tweetCustom = {};

                tweetCustom.data = tweet.tweet.data;
                tweetCustom.likes = tweet.likes;
                tweetCustom.retweetCount = tweet.retweetCount;
                return tweetCustom;
            })
        });
    } else if (action.type === GET_TOP_TEN_TWEETS_BY_LIKES) {
        // data: [{
        //     type: "bar",
        //     dataPoints: [
        //         { y: 2200000000, label: "Tweet 1" },
        //         { y: 1800000000, label: "Tweet 2" },
        //         { y: 800000000, label: "Tweet 3" },
        //         { y: 563000000, label: "Tweet 4" },
        //         { y: 376000000, label: "Tweet 5" },
        //         { y: 2200000000, label: "Tweet 6" },
        //         { y: 1800000000, label: "Tweet 7" },
        //         { y: 800000000, label: "Tweet 8" },
        //         { y: 563000000, label: "Tweet 9" },
        //         { y: 376000000, label: "Tweet 10" },
        //     ]
        // }]

        const tweets = action.payload.data.res.map((tweet, index) => {
            const tweetCustom = {};

            tweetCustom.data = tweet.tweet.data;
            tweetCustom.likes = tweet.likes;
            tweetCustom.retweetCount = tweet.retweetCount;
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
        return Object.assign({}, state, {
            //topTenTweetsByRetweets: action.payload.tweets,
            topTenTweetsByRetweets: action.payload.data.res.map((tweet, index) => {
                const tweetCustom = {};

                tweetCustom.data = tweet.tweet.data;
                tweetCustom.likes = tweet.likes;
                tweetCustom.retweetCount = tweet.retweetCount;
                return tweetCustom;
            })
        });
    }

    return state;
}