import { GET_PROFILE, GET_FOLLOWEES, GET_FOLLOWERS } from "../../redux/constants/actionTypes";
import { HOSTNAME } from "../../constants/appConstants";
import axios from "axios";

export function getProfile(data) {
    return function (dispatch) {
        // var headers = {
        //     "Content-Type": "application/json",
        //     Authorization: "Bearer " + sessionStorage.getItem("token")
        // };
        axios.defaults.withCredentials = true;
        axios
            .get(`http://${HOSTNAME}:8080/api/v1/user/` + data.user_id)
            .then(response => dispatch(getUserDetails(response))).catch(err => { console.log(err); });
    };
}

function getUserDetails(returndata) {
    // console.log("Inside getUserDetails - returndata: ", JSON.stringify(returndata));
    return { type: GET_PROFILE, payload: returndata };
}
// getfollowers API
export function getfollowers(data) {
    return function (dispatch) {
        // var headers = {
        //     "Content-Type": "application/json",
        //     Authorization: "Bearer " + sessionStorage.getItem("token")
        // };
        axios.defaults.withCredentials = true;
        axios
            .get(`http://${HOSTNAME}:8080/api/v1/user/` + data.user_id + `/followers`)
            .then(response => dispatch(getUserfollowers(response))).catch(err => { console.log(err); });
    };
}
function getUserfollowers(returndata) {
    // console.log("Inside getUserDetails - returndata: ", JSON.stringify(returndata));
    return { type: GET_FOLLOWERS, payload: returndata };
}
// getfollowees API
export function getfollowees(data) {
    return function (dispatch) {
        // var headers = {
        //     "Content-Type": "application/json",
        //     Authorization: "Bearer " + sessionStorage.getItem("token")
        // };
        axios.defaults.withCredentials = true;
        axios
            .get(`http://${HOSTNAME}:8080/api/v1/user/` + data.user_id + `/followees`)
            .then(response => dispatch(getUserfollowees(response))).catch(err => { console.log(err); });
    };
}

function getUserfollowees(returndata) {
    console.log("Inside getUserfollowees - returndata: ", JSON.stringify(returndata));
    return { type: GET_FOLLOWEES, payload: returndata };
}