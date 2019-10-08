import axios from "axios";
import { GET_ERRORS } from "./types";

//Paths
const createTaskPath = "http://localhost:8080/api/board/create";

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