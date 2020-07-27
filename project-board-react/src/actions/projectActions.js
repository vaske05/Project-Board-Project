import axios from "axios";
import { GET_ERRORS, GET_PROJECT, DELETE_PROJECT, GET_PROJECTS } from "./types";

//Endpoint urls
const createProjectPath = "http://localhost:8080/api/project/create";
const getProjectsPath = "http://localhost:8080/api/project/all";
const deleteProjectPath = "http://localhost:8080/api/project/delete";
const getProjectPath = `http://localhost:8080/api/project/get`;

/*
* Http Post request to create new Project 
*/
export const createProject = (project, history) => async dispatch => {
    
    try {
        await axios.post(createProjectPath, project);
        history.push("/dashboard");
        
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

/*
* Http Post request to get all Projects from DB
*/
export const gelAllProjects = () => async dispatch => {
    const res = await axios.get(getProjectsPath);
    dispatch({
        type: GET_PROJECTS,
        payload: res.data
    });
   
};

/*
* Http Get request to delete Project
*/
export const deleteProject = project_id => async dispatch => {
    const res = await axios.get(deleteProjectPath);
    dispatch({
        type: GET_PROJECTS,
        payload: res.data
    });
   
};

export const getProject = (project_id, history) => async dispatch => {

    try {
        const res = await axios.get(getProjectPath + `/${project_id}`);
        dispatch({
            type: GET_PROJECT,
            payload: res.data
        });
        
    } catch (error) {
        history.push("/dashboard");
    }
}