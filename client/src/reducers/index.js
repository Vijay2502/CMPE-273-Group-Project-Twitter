import { combineReducers } from "redux";
import feedsReducer from "./userReducer";
import listReducer from "./userReducer";
import tweetsReducer from "./tweetsReducer";
import userReducer from "./userReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    users: userReducer,
    auth: authReducer,
    tweets: tweetsReducer,
    // list: listReducer,
    // feeds: feedsReducer
});
export default rootReducer;
