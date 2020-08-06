import axios from "axios";
import {GET_ERRORS, SET_CURRENT_USER} from "./types";
import setJwtToken from "../securityUtils/setJwtToken";
import jwt_decode from 'jwt-decode';

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

export const login = LoginRequest => async dispatch => {

    try {
        // post => LoginRequest
        const res = await axios.post(USER_LOGIN_PATH, LoginRequest);
        // extract token from res.data
        const { token } = res.data;
        // store the token in localStorage
        localStorage.setItem("jwtToken", token);
        // set our token in header ***
        setJwtToken(token);
        // decode the token
        const decodedToken = jwt_decode(token);
        // dispatch to our securityReducer
        dispatch({
            type: SET_CURRENT_USER,
            payload: decodedToken
        });
    }
    catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
}