import {SIGN_IN, SIGN_UP, SIGN_IN_ERROR} from "../../redux/constants/actionTypes";

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
        localStorage.setItem('firstName', action.payload.data.user.firstName);
        localStorage.setItem('lastName', action.payload.data.user.lastName);
        localStorage.setItem('id', action.payload.data.user.id);

        //To do
        localStorage.setItem('image', action.payload.data.user.username);

        return Object.assign({}, state, {
            signinSuccess: action.payload.status === "ok" ? true : false,
            signinMessage: "",
        });
    } else if (action.type === SIGN_IN_ERROR) {
        return Object.assign({}, state, {
            signinSuccess: false,
            signinMessage: "Login failed, incorrect username or password",
        });
    } if (action.type === SIGN_UP) {
        return Object.assign({}, state, {
            signupSuccess: action.payload.status === "ok" ? true : false,
            signupMessage: "",
        });
    }

    return state;
}