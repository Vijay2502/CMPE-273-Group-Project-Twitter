import {SIGN_IN, SIGN_UP} from "../../redux/constants/actionTypes";

const initialState = {
    signupSuccess: null,
    signupMessage: null,
    signinSuccess: null,
    signinMessage: null,
    userType: null,
    token: null,
    userId: null
};

export default function authReducer(state = initialState, action) {
    console.log("action.payload");
    console.log(action.payload);

    if (action.type === SIGN_IN) {
        return Object.assign({}, state, {
            signinSuccess: action.payload.signinSuccess,
            signinMessage: action.payload.signinMessage,
            userType: action.payload.user.userType,
            userId: action.payload._id
        });
    } else if (action.type === SIGN_UP) {
        // localStorage.setItem('token', returnData.user.token);
        // localStorage.setItem('_id', returnData.user._id);
        // localStorage.setItem('userType', returnData.user.userType);

        return Object.assign({}, state, {
            signupSuccess: action.payload.status === "ok" ? true : false,
            signupMessage: action.payload.data.message,
        });
    }

    return state;
}