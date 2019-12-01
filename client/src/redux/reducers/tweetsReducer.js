import { CREATE_TWEET, GET_USER_TWEETS } from "../../redux/constants/actionTypes";

const initialState = {
    createTweetSuccess: null,
    createTweetMessage: null,
    userTweets: []
};

function generateTweets(tweets) {
    console.log("generateTweets")
    console.log(tweets)

    const userTweetsArray = [];

    for (const tweet of tweets.tweets) {
        const tweetCustom = {};
        tweetCustom.name = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
        tweetCustom.tweet = tweet.data.text;

        userTweetsArray.push(tweetCustom);
    }

    console.log("userTweetsArray")
    console.log(userTweetsArray)
}

export default function tweetReducer(state = initialState, action) {
    console.log("action.payload");
    console.log(action.payload);

    if (action.type === CREATE_TWEET) {
        return Object.assign({}, state, {
            createTweetSuccess: action.payload.signinSuccess,
            createTweetMessage: action.payload.signinMessage,
        });
    }

    if (action.type === GET_USER_TWEETS) {
        const gottweets = generateTweets(action.payload.data.data);
        console.log("gottweets");
        console.log(gottweets);
        const userTweetsArray = [];

        return Object.assign({}, state, {
            userTweets: action.payload.data.data.tweets.map((tweet, index) => {
                const tweetCustom = {};
                tweetCustom.name = localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
                tweetCustom.tweet = tweet.data.text;
                return tweetCustom;
            })
        });
    }


    return state;
}