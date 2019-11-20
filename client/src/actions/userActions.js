import { FETCH_LOGIN } from "./types";
import axios from "axios";

// import connectionUrl from "../config/config";// config file to be created 
let connectionUrl = "localhost:";

//////////////////////////////// SAMPLE ACTION ///////////////////////////////
export function fetchLogin(data) {
    return function (dispatch) {
        var headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("token")
        };
        var test = "http://" + connectionUrl + "3000/users/loginbuyer";
        // console.log("testing successful. Redux working" + test);
        axios.defaults.withCredentials = true;
        axios
            .post("http://" + connectionUrl + "/users/loginbuyer", data, {
                headers: headers
            })
            // .then(response => response.json())// uncomment it if you want to parse the body text as JSON. It returns a promise
            .then(response => dispatch(signinUpd(response))); // in case you want to do something before calling the reducer. 
        // .then(responseData => {dispatch({type: FETCH_LOGIN,payload: response});})
    };
}
function signinUpd(returndata) {
    if (returndata.data.result.response.success == true) {
        let jwtToken = returndata.data.result.response.token.split(" ")[1]; // to use JWT token 
        sessionStorage.setItem("first_name", returndata.data.result.response.first_name);
        sessionStorage.setItem("last_name", returndata.data.result.response.last_name);
        sessionStorage.setItem("token", jwtToken);
        sessionStorage.setItem("email_id", returndata.data.result.response.email_id);
    }
    return { type: FETCH_LOGIN, payload: returndata };
}
/////// DIRECT DISPATCH ///////
export function fetchLogin1(data) {
    return function (dispatch) {
        var headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("token")
        };
        var test = "http://" + connectionUrl + "3000/users/loginbuyer";
        // console.log("testing successful. Redux working" + test);
        axios.defaults.withCredentials = true;
        axios
            .post("http://" + connectionUrl + "/users/loginbuyer", data, {
                headers: headers
            })
            // .then(response => response.json())// uncomment it if you want to parse the body text as JSON. It returns a promise
            .then(response => { dispatch({ type: FETCH_LOGIN, payload: response }); })
    };
}
//////////////////////////////// END ///////////////////////////////