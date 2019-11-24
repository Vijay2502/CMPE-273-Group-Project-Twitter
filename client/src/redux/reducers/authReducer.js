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
        localStorage.setItem('token', action.payload.data.token);
        localStorage.setItem('username', action.payload.data.user.username);

        return Object.assign({}, state, {
            signinSuccess: action.payload.status === "ok" ? true : false,
            signinMessage: "",
        });
    } else if (action.type === SIGN_UP) {

        return Object.assign({}, state, {
            signupSuccess: action.payload.status === "ok" ? true : false,
            signupMessage: action.payload.data.message,
        });
    }

    return state;
}