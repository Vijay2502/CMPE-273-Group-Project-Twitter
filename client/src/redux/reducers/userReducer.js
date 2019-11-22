import {FETCH_LOGIN} from "../constants/types";

const initialState = {
    errMsg: null
};

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        //////////////////////////////// SAMPLE ACTION /////////////////////////////// 
        case FETCH_LOGIN:
            console.log("Fetch Login Action" + JSON.stringify(action.payload.data));
            return Object.assign({}, state, {
                errMsg: action.payload.data.result.response.errMsg,
                authFlag: action.payload.data.result.response.authFlag
            });
        //////////////////////////////// END ///////////////////////////////
        default:
            return state;
    }
}
