import axios from "axios";
import { GET_ERRORS, GET_PROJECT, DELETE_PROJECT, GET_PROJECTS } from "./types";

//Endpoint urls
const createProjectPath = "http://localhost:8080/api/project/create";
const getProjectsPath = "http://localhost:8080/api/project/all";
const deleteProjectPath = "http://localhost:8080/api/project/delete";
const getProjectPath = "http://localhost:8080/api/board/get";

/*
* Http Post request to create new Project 
*/
export const createProject = (project, history) => async dispatch => {
    try {
        await axios.post(createProjectPath, project);
        history.push("/dashboard");
        // dispatch({
        //     type: GET_ERRORS,
        //     payload: {}
        // });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
}