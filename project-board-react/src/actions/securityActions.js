import axios from "axios";
import {GET_ERRORS} from "./types";

//Endpoint urls
const USER_REGISTRATION_PATH = "/api/users/register";
const USER_LOGIN_PATH = "/api/users/login";


export const createNewUser = (newUser, history) => async dispatch => {
    try {
        await axios.post(USER_REGISTRATION_PATH, newUser);
        history.push("/login")
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    }
    catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
}