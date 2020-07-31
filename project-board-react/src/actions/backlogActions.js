import axios from "axios";
import { GET_ERRORS, GET_BACKLOG, DELETE_PROJECT_TASK, GET_PROJECT_TASK } from "./types";

//Endpoint urls
const createTaskPath = "http://localhost:8080/api/backlog/create";
const getTasksPath = "http://localhost:8080/api/backlog/all";
const deleteTaskPath = "http://localhost:8080/api/backlog/delete";
const getTaskPath = "http://localhost:8080/api/backlog/get";

/*
* Http Post request to add new project task
*/
export const addProjectTask = (backlog_id, project_task, history) => async dispatch => {

    try {
        await axios.post(createTaskPath + `/${backlog_id}`, project_task);
        history.push(`/projectBoard/${backlog_id}`); //Redirect to project board page
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
        
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

/*
* Http Get request to get all tasks
*/
export const getBacklog = () => async dispatch => {
    const res = await axios.get(getTasksPath);
    dispatch({
        type: GET_BACKLOG,
        payload: res.data
    });
};

/*
* Http Delete request to delete appropriate task.
*/
export const deleteProjectTask = pt_id => async dispatch => {
    if( (window.confirm(`Are you sure to delete task ${pt_id}`)) ) {
        
        await axios.delete(deleteTaskPath + `/${pt_id}`);
        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: pt_id
        });
    }
};

/*
* Http Get request to grab appropriate task.
*/
export const getProjectTask = (pt_id, history) => async dispatch => {
    try {
        const res = await axios.get(getTaskPath + `/${pt_id}`);
        dispatch({
            type: GET_PROJECT_TASK,
            payload: res.data
        });
    } catch (error) {
            history.push("/");
    }
}

