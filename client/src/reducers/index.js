import { combineReducers } from "redux";
import feedsReducer from "./userReducer";
import listReducer from "./userReducer";
import tweetsReducer from "./tweetsReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    users: userReducer
    // tweets: tweetsReducer,
    // list: listReducer,
    // feeds: feedsReducer
});
export default rootReducer;
