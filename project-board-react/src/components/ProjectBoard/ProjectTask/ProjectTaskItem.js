import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProjectTask } from "../../../actions/backlogActions";
import { addClass } from '../../../helpers';


class ProjectTaskItem extends Component {

    onDeleteClick(pt_id) {
        this.props.deleteProjectTask(pt_id);
    }

    drag(ev) {
        ev.dataTransfer.setData("id", ev.target.id);

        // old
        // const divs = document.getElementsByClassName("statusDiv");
        // addClass(divs, "customShadow");

        //new
        const divToDo = document.getElementById("divToDo");
        const divInProgress = document.getElementById("divInProgress");
        const divDone = document.getElementById("divDone");

        divToDo.classList.add("customShadowGrey");
        divInProgress.classList.add("customShadowBlue");
        divDone.classList.add("customShadowGreen");
        //
    }

    drop(ev) {
        ev.returnValue = false;
    }

    render() {
        const { project_task } = this.props;
        return (
        <div className="card mb-1 bg-light" draggable="true" id={`${project_task.id}`} onDragStart={this.drag} onDrop={this.drop}>
            <div className="card-header text-primary cardHead">
                 {project_task.summary}
            </div>
            <div className="card-body bg-light">
                
                <p className="card-text text-truncate ">
                    {project_task.acceptanceCriteria}
                </p>
                <Link to={`updateProjectTask/${project_task.id}`} className="btn btn-primary">
                    View / Update
                </Link>

                <button className="btn btn-danger ml-4" onClick={this.onDeleteClick.bind(this, project_task.id)}>
                    Delete
                </button>
            </div>
        </div>

        );
    }
};

ProjectTaskItem.propTypes = {
    deleteProjectTask: PropTypes.func.isRequired
}

//Connect React component to a Redux store.
export default connect(null, { deleteProjectTask }) (ProjectTaskItem);
