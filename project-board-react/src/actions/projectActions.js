import axios from "axios";
import { GET_ERRORS, GET_PROJECT, DELETE_PROJECT, GET_PROJECTS } from "./types";

//Endpoint urls
const CREATE_PROJECT_PATH = "/api/project/create";
const GET_PROJECTS_PATH = "/api/project/all";
const DELETE_PROJECT_PATH = "/api/project/delete";
const GET_PROJECT_PATH = "/api/project/get";

/*
* Http Post request to create new Project 
*/
export const createProject = (project, history) => async dispatch => {
    
    try {
        await axios.post(CREATE_PROJECT_PATH, project);
        history.push("/dashboard");
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
* Http Post request to get all Projects from DB
*/
export const gelAllProjects = () => async dispatch => {
    const res = await axios.get(GET_PROJECTS_PATH);
    dispatch({
        type: GET_PROJECTS,
        payload: res.data
    });
   
};

/*
* Http Delete request to delete Project
*/
export const deleteProject = project_identifier => async dispatch => {
    if( (window.confirm(`Are you sure to delete project ${project_identifier}`)) ) {
        await axios.delete(DELETE_PROJECT_PATH + `/${project_identifier}`);
        dispatch({
            type: DELETE_PROJECT,
            payload: project_identifier
        });
    }
   
};

/*
* Http Get request to grab Project
*/
export const getProject = (project_id, history) => async dispatch => {

    try {
        const res = await axios.get(GET_PROJECT_PATH + `/${project_id}`);
        dispatch({
            type: GET_PROJECT,
            payload: res.data
        });
        
    } catch (error) {
        history.push("/dashboard");
    }
}