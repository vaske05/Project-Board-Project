import { combineReducers } from "redux";
import errorsReducer from "./errorsReducer";
import backlogReducer from "./backlogReducer";
import projectReducer from './projectReducer';

export default combineReducers ({
    //
    errors: errorsReducer,
    project_task: backlogReducer,
    project: projectReducer
});