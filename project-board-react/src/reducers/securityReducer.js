import {GET_ERRORS, SET_CURRENT_USER} from "../actions/types";


const initial_state = {
    user: {},
    isAuthenticated: false
}

const isAuthenticated = (payload) => {
    if(payload) {
        return true;
    } else {
        return false;
    }
}

export default function (state=initial_state, action) {
    switch (action.type) {
        case SET_CURRENT_USER:

            return {
                ...state,
                isAuthenticated: isAuthenticated(action.payload),
                user: action.payload
            };

        case GET_ERRORS: {

        }

        default:
            return state;
    }
}