import axios from "axios";
import {GET_ERRORS, SET_CURRENT_USER} from "./types";
import setJwtToken from "../securityUtils/setJwtToken";
import jwt_decode from 'jwt-decode';

//Endpoint urls
const USER_REGISTRATION_PATH = "/api/users/register";
const USER_LOGIN_PATH = "/api/users/login";

/*
 * User registration
 */
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

/*
 * User login
 */
export const login = (LoginRequest, history) => async dispatch => {

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
        //Automatic logout when token gets expired
        //dispatch(automaticLogout(decodedToken.exp));
        startLogoutTimer(decodedToken.exp, history)(dispatch)
    }
    catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
}

/*
 * User logout
 */
export const logout = (history) => async dispatch => {
    localStorage.removeItem("jwtToken"); // remove token from local storage
    setJwtToken(false); // Delete header
    dispatch({
        type: SET_CURRENT_USER,
        payload: {} // empty payload(no token)
    });
    history ? history.push("/") : window.location.href = "/";
}

/*
 * Timer function for User logout when token gets expired
 */
export const startLogoutTimer = (expTime, history) => dispatch => {
    const currentTime = Date.now() / 1000;
    const remainingTime = expTime - currentTime;

    setTimeout(() => {
        //dispatch(logout())
        logout(history)(dispatch)
    }, remainingTime*1000);
}