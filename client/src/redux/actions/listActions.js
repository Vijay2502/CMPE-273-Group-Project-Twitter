import {CREATE_LIST,ADD_MEMBER,REMOVE_MEMBER,GET_LIST_ID,GET_MEMBERS_IN_LIST,GET_SUBSCRIBERS_IN_LIST,GET_OWNEDLISTS,GET_SUBSCRIBEDLIST,GET_MEMBERLISTS,GET_TWEETS_LIST} from "../../redux/constants/actionTypes";
import {HOSTNAME} from "../../constants/appConstants";

import axios from 'axios';

//  *********** CREATE LIST ***********
export function createList(payload) {
    console.log("createList payload");
    console.log(payload);

    return (dispatch) => {
        axios.post(`http://${HOSTNAME}:8080/api/v1/list/create`, payload)
            .then((response) => dispatch(createDispatch(response.data)));
    }
}
export const createDispatch = (returnData) => {
    console.log("Inside createDispatch");
    console.log(returnData);
    return {type: CREATE_LIST, payload: returnData}
};

//  *********** ADD MEMBERS ***********
export function addMem(payload) {
    console.log("addMem payload");
    console.log(payload);

    return (dispatch) => {
        axios.post(`http://${HOSTNAME}:8080/api/v1//list/:id/add-member`, payload)
            .then((response) => dispatch(addMembersDispatch(response.data)));
    }
}
export const addMembersDispatch = (returnData) => {
    console.log("Inside addMembersDispatch");
    console.log(returnData);
    return {type: ADD_MEMBER, payload: returnData}
};

//  *********** REMOVE MEMBERS ***********
export function removeMem(payload) {
    console.log("addMem payload");
    console.log(payload);

    return (dispatch) => {
        axios.post(`http://${HOSTNAME}:8080/api/v1//list/:id/remove-member`, payload)
            .then((response) => dispatch(removeMembersDispatch(response.data)));
    }
}
export const removeMembersDispatch = (returnData) => {
    console.log("Inside removeMembersDispatch");
    console.log(returnData);
    return {type: REMOVE_MEMBER, payload: returnData}
};


//  ***********  GET LIST BY ID ***********
export function getListById(payload) {
    console.log("getListById payload");
    console.log(payload);

    return (dispatch) => {
        axios.get(`http://${HOSTNAME}:8080/api/v1//list/get/:id`)
            .then((response) => dispatch(getListbyIdDispatch(response.data)));
    }
}
export const getListbyIdDispatch = (returnData) => {
    console.log("Inside getListbyIdDispatch");
    console.log(returnData);

    return {type: GET_LIST_ID, payload: returnData}
};

//  ***********  GET MEMBERS ***********
export function getMemberInAList(payload) {
    console.log("getMemberInAList payload");
    console.log(payload);

    return (dispatch) => {
        axios.get(`http://${HOSTNAME}:8080/api/v1/list/:id/members`)
            .then((response) => dispatch(getMemberInAListDispatch(response.data)));
    }
}
export const getMemberInAListDispatch = (returnData) => {
    console.log("Inside getMemberInAListDispatch");
    console.log(returnData);

    return {type: GET_MEMBERS_IN_LIST, payload: returnData}
};

//  ***********  GET SUBSCRIBERS ***********
export function getSubscriberInAList(payload) {
    console.log("getSubscriberInAList payload");
    console.log(payload);

    return (dispatch) => {
        axios.get(`http://${HOSTNAME}:8080/api/v1/list/:id/subscribers`)
            .then((response) => dispatch(getSubscriberInAListDispatch(response.data)));
    }
}
export const getSubscriberInAListDispatch = (returnData) => {
    console.log("Inside getSubscriberListDispatch");
    console.log(returnData);

    return {type: GET_SUBSCRIBERS_IN_LIST, payload: returnData}
};

//  ***********  GET OWNER LISTS  ***********
export function getOwnedLists(payload) {
    console.log("getOwnedList payload");
    console.log(payload);

    return (dispatch) => {
        axios.get(`http://${HOSTNAME}:8080/api/v1/user/:id/owner/lists`)
            .then((response) => dispatch(getOwnedListDispatch(response.data)));
    }
}
export const getOwnedListDispatch = (returnData) => {
    console.log("Inside getOwnedListDispatch");
    console.log(returnData);

    return {type: GET_OWNEDLISTS, payload: returnData}
};

//  ***********  GET SUBSCRIBED LISTS***********
export function getSubscribedLists(payload) {
    console.log("getSubscribedList  payload");
    console.log(payload);

    return (dispatch) => {
        axios.get(`http://${HOSTNAME}:8080/api/v1/user/:id/subscriber/lists`)
            .then((response) => dispatch(getSubscribedListDispatch(response.data)));
    }
}
export const getSubscribedListDispatch = (returnData) => {
    console.log("Inside getSubscribedListDispatch");
    console.log(returnData);

    return {type: GET_SUBSCRIBEDLIST, payload: returnData}
};

//  ***********  GET MEMBER LISTS***********
export function getMemberLists(payload) {
    console.log("getMemberLists payload");
    console.log(payload);

    return (dispatch) => {
        axios.get(`http://${HOSTNAME}:8080/api/v1/user/:id/memeber/lists`)
            .then((response) => dispatch(getMemberListsDispatch(response.data)));
    }
}

export const getMemberListsDispatch = (returnData) => {
    console.log("Inside getMemberListsDispatch");
    console.log(returnData);

    return {type: GET_MEMBERLISTS, payload: returnData}
};


//  ***********  GET MEMBER LISTS***********
export function getTweetByListId(payload) {
    console.log("getTweetByListId payload");
    console.log(payload);

    return (dispatch) => {
        axios.get(`http://${HOSTNAME}:8080/api/v1/tweet/byList/:listId`)
            .then((response) => dispatch(getTweetByListIdDispatch(response.data)));
    }
}
export const getTweetByListIdDispatch = (returnData) => {
    console.log("Inside getTweetByListIdDispatch");
    console.log(returnData);

    return {type: GET_TWEETS_LIST, payload: returnData}
};