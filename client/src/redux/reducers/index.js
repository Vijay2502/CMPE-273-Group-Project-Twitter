import {combineReducers} from "redux";
import userReducer from "./userReducer";
import tweetsReducer from "./tweetsReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    users: userReducer,
    auth: authReducer,
    tweets: tweetsReducer,
    // list: listReducer,
    // feeds: feedsReducer
});
export default rootReducer;
