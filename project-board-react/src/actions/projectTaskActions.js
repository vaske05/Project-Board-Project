import axios from "axios";
import { GET_ERRORS, GET_PROJECT_TASKS, DELETE_PROJECT_TASK, GET_PROJECT_TASK } from "./types";

//Endpoint urls
const createTaskPath = "http://localhost:8080/api/board/create";
const getTasksPath = "http://localhost:8080/api/board/all";
const deleteTaskPath = `http://localhost:8080/api/board/delete`;
const getTaskPath = `http://localhost:8080/api/board/update`;

/*
* Http Post request to add new project task
*/
export const addProjectTask = (project_task, history) => async dispatch => {

    try {
        await axios.post(createTaskPath, project_task);
        history.push("/"); //Redirect to home page
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
        type: GET_PROJECT_TASKS,
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
*
*/
export const getProjectTask = (pt_id, history) => async dispatch => {
    try {
        const res = await axios.get(getTaskPath + `/${pt_id}`);
        dispatch({
            type: GET_PROJECT_TASK,
            payload: res.data
        });
    } catch (error) {
            console.log(error);
            history.push("/");
    }
}

