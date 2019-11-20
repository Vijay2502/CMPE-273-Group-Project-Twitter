import {SIGN_IN, HOSTNAME} from "../constants/actionTypes";
import axios from 'axios';

export function signIn(payload) {
    console.log("signInMongo payload")
    console.log(payload)

    return (dispatch) => {
        console.log("Inside signInMongo");

        axios.post(`http://${HOSTNAME}:3001/access/login`, payload)
            .then((response) => dispatch(signInDispatch(response.data)));
    }
}

export const signInDispatch = (returnData) => {
    console.log("Inside signIn dispatch")
    console.log(returnData)
    localStorage.setItem('token', returnData.user.token);
    localStorage.setItem('_id', returnData.user._id);
    localStorage.setItem('userType', returnData.user.userType);
    return {type: SIGN_IN, payload: returnData}
};

export function signUp(payload) {
    console.log("signInMongo payload")
    console.log(payload)

    return (dispatch) => {
        console.log("Inside signInMongo");

        axios.post(`http://${HOSTNAME}:3001/access/login`, payload)
            .then((response) => dispatch(signUpDispatch(response.data)));
    }
}

export const signUpDispatch = (returnData) => {
    console.log("Inside signIn dispatch")
    console.log(returnData)
    localStorage.setItem('token', returnData.user.token);
    localStorage.setItem('_id', returnData.user._id);
    localStorage.setItem('userType', returnData.user.userType);
    return {type: SIGN_IN, payload: returnData}
};