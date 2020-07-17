import { combineReducers} from "redux";
import errorsReducer from "./errorsReducer";
import projectTaskReducer from "./projectTaskReducer";
import projectReducer from './projectReducer';

export default combineReducers ({
    //
    errors: errorsReducer,
    project_task: projectTaskReducer,
    project: projectReducer
});