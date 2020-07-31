import axios from "axios";
import { GET_ERRORS, GET_PROJECT, DELETE_PROJECT, GET_PROJECTS } from "./types";

//Endpoint urls
const createProjectPath = "/api/project/create";
const getProjectsPath = "/api/project/all";
const deleteProjectPath = "/api/project/delete";
const getProjectPath = "/api/project/get";

/*
* Http Post request to create new Project 
*/
export const createProject = (project, history) => async dispatch => {
    
    try {
        await axios.post(createProjectPath, project);
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
    const res = await axios.get(getProjectsPath);
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
        await axios.delete(deleteProjectPath + `/${project_identifier}`);
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
        const res = await axios.get(getProjectPath + `/${project_id}`);
        dispatch({
            type: GET_PROJECT,
            payload: res.data
        });
        
    } catch (error) {
        history.push("/dashboard");
    }
}