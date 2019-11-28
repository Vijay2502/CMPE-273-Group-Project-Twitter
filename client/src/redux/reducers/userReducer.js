import { GET_PROFILE, GET_FOLLOWEES, GET_FOLLOWERS } from "../constants/actionTypes";

const initialState = {
    userDetails: null,
    followerCount: null,
    followeeCount: null
};

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
            console.log("GET_PROFILE reducer data: " + JSON.stringify(action.payload.data));
            return Object.assign({}, state, {
                userDetails: action.payload.data.data.user
            });
        case GET_FOLLOWEES:
            console.log("GET_FOLLOWEES reducer data: " + JSON.stringify(action.payload.data));
            return Object.assign({}, state, {
                followeeCount: action.payload.data.data.user
            });
        case GET_FOLLOWERS:
            console.log("GET_FOLLOWERS reducer data: " + JSON.stringify(action.payload.data));
            return Object.assign({}, state, {
                followerCount: action.payload.data.data.user
            });
        default:
            return state;
    }
}
