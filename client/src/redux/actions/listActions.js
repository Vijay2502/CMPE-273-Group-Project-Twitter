import {CREATE_LIST,GET_MEMBERS_LIST,GET_SUBSCRIBERS_LIST,GET_LIST_ID,GET_LIST,ADD_MEMBER} from "../../redux/constants/actionTypes";
import {HOSTNAME} from "../../constants/appConstants";

import axios from 'axios';

//  *********** CREATE LIST ***********
export function createList(payload) {
    console.log("createList payload");
    console.log(payload);

    return (dispatch) => {
        axios.post(`http://${HOSTNAME}:8080/api/v1/ist/create`, payload)
            .then((response) => dispatch(createDispatch(response.data)));
    }
}
export const createDispatch = (returnData) => {
    console.log("Inside signInDispatch");
    console.log(returnData);
    return {type: CREATE_LIST, payload: returnData}
};

//  *********** ADD MEMBERS ***********
export function addMem(payload) {
    console.log("createList payload");
    console.log(payload);

    return (dispatch) => {
        axios.post(`http://${HOSTNAME}:8080/api/v1/ist/create`, payload)
            .then((response) => dispatch(addMembersDispatch(response.data)));
    }
}
export const addMembersDispatch = (returnData) => {
    console.log("Inside signInDispatch");
    console.log(returnData);
    return {type: ADD_MEMBER, payload: returnData}
};


//  ***********  GET LIST BY ID ***********
export function getLists(payload) {
    console.log("signUp payload");
    console.log(payload);

    return (dispatch) => {
        axios.post(`http://${HOSTNAME}:8080/api/v1/user/register`, payload)
            .then((response) => dispatch(signUpDispatch(response.data)));
    }
}
export const getListsDispatch = (returnData) => {
    console.log("Inside signUpDispatch");
    console.log(returnData);

    return {type: GET, payload: returnData}
};

//  ***********  GET MEMBERS ***********
export function getLists(payload) {
    console.log("signUp payload");
    console.log(payload);

    return (dispatch) => {
        axios.post(`http://${HOSTNAME}:8080/api/v1/user/register`, payload)
            .then((response) => dispatch(signUpDispatch(response.data)));
    }
}
export const signUpDispatch = (returnData) => {
    console.log("Inside signUpDispatch");
    console.log(returnData);

    return {type: SIGN_UP, payload: returnData}
};

//  ***********  GET SUBSCRIBERS ***********
export function getLists(payload) {
    console.log("signUp payload");
    console.log(payload);

    return (dispatch) => {
        axios.post(`http://${HOSTNAME}:8080/api/v1/user/register`, payload)
            .then((response) => dispatch(signUpDispatch(response.data)));
    }
}
export const signUpDispatch = (returnData) => {
    console.log("Inside signUpDispatch");
    console.log(returnData);

    return {type: SIGN_UP, payload: returnData}
};