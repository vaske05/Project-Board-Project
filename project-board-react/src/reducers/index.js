import { combineReducers } from "redux";
import errorsReducer from "./errorsReducer";
import backlogReducer from "./backlogReducer";
import projectReducer from './projectReducer';

export default combineReducers ({
    //
    errors: errorsReducer,
    backlog: backlogReducer,
    project: projectReducer
});