import {GET_BACKLOG, DELETE_PROJECT_TASK, GET_PROJECT_TASK} from "../actions/types";

const initialState = {
    project_tasks: [],
    project_task: {}
};



export default function(state = initialState, action) {
    switch (action.type) {
        case GET_BACKLOG:
            return {
                ...state,
                project_tasks: action.payload
            };
        case DELETE_PROJECT_TASK:
            return { 
                ...state,
                project_tasks: state.project_tasks.filter(task => task.id !== action.payload)
            }
        case GET_PROJECT_TASK:
            return {
                ...state,
                project_task: action.payload
            }
            
        default:
            return state;
    }
}

