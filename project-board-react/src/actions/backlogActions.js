import axios from "axios";
import { GET_ERRORS, GET_BACKLOG, DELETE_PROJECT_TASK, GET_PROJECT_TASK } from "./types";

//Endpoint urls
const CREATE_TASK_PATH = "/api/backlog/create";
const UPDATE_TASK_PATH = "/api/backlog/update";
const GET_TASKS_PATH = "/api/backlog/all";
const DELETE_TASK_PATH = "/api/backlog/delete";
const GET_TASK_PATH = "/api/backlog/get";

/*
* Http Post request to add new project task
*/
export const addProjectTask = (backlog_id, project_task, history) => async dispatch => {

    try {
        await axios.post(CREATE_TASK_PATH + `/${backlog_id}`, project_task);
        history.push(`/projectBoard/${backlog_id}`); //Redirect to project board page
        dispatch({
            type: GET_ERRORS,
            payload: {} // clear errors
        });
        
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data // load errors
        });
    }
};

/*
* Http Get request to get all tasks
*/
export const getBacklog = (backlog_id) => async dispatch => {

    try {
        const res = await axios.get(GET_TASKS_PATH + `/${backlog_id}`);
        dispatch({
            type: GET_BACKLOG,
            payload: res.data
        }); 
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });   
    }
};

/*
* Http Delete request to delete appropriate task.
*/
export const deleteProjectTask = (backlog_id, pt_id) => async dispatch => {
    if( (window.confirm(`Are you sure to delete task ${pt_id}`)) ) {
        
        await axios.delete(DELETE_TASK_PATH + `/${backlog_id}/${pt_id}`);
        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: pt_id
        });
    }
};

/*
* Http Get request to grab appropriate task.
*/
export const getProjectTask = (backlog_id, pt_id, history) => async dispatch => {
    try {
        const res = await axios.get(GET_TASK_PATH+ `/${backlog_id}/${pt_id}`);
        dispatch({
            type: GET_PROJECT_TASK,
            payload: res.data
        });
    } catch (error) {
            history.push("/dashboard");
    }
}

/*
* Http Patch request to UPDATE project task
*/
export const updateProjectTask = (backlog_id, pt_id, project_task, history) => async dispatch => {

    try {
        await axios.patch(UPDATE_TASK_PATH + `/${backlog_id}/${pt_id}`, project_task);
        history.push(`/projectBoard/${backlog_id}`); //Redirect to project board page
        dispatch({
            type: GET_ERRORS,
            payload: {} // clear errors
        });
        
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data // load errors
        });
    }
};