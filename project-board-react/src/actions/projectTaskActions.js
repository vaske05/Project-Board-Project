import axios from "axios";

export const addProjectTask = (project_task, history) => async dispatch => {
    await axios.post("http://localhost:8080/api/board/create", project_task)
    .catch(function (error) {
        console.log(error);
    });

    history.push("/"); //Redirect to home page
}