import { combineReducers } from "redux";
import errorsReducer from "./errorsReducer";
import backlogReducer from "./backlogReducer";
import projectReducer from './projectReducer';
import securityReducer from "./securityReducer";

export default combineReducers ({
    errors: errorsReducer,
    backlog: backlogReducer,
    project: projectReducer,
    security: securityReducer
});