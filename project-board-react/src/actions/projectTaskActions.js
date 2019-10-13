import axios from "axios";
import { GET_ERRORS, GET_PROJECT_TASKS } from "./types";

//Paths
const createTaskPath = "http://localhost:8080/api/board/create";
const getTasksPath = "http://localhost:8080/api/board/all";

/*
* Http Post request to add new project task
*/
export const addProjectTask = (project_task, history) => async dispatch => {

    try {
        await axios.post(createTaskPath, project_task);
        history.push("/"); //Redirect to home page
        dispatch({
            type:"GET_ERRORS",
            payload: {}
        });
        
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
}

/*
* Http Get request to get all tasks
*/
export const getBacklog = () => async dispatch => {
    const res = await axios.get(getTasksPath);
    dispatch({
        type: GET_PROJECT_TASKS,
        payload: res.data
    })
};

