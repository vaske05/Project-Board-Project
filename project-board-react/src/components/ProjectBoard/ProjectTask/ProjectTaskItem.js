import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProjectTask } from "../../../actions/backlogActions";
import { addClass } from '../../../helpers';


class ProjectTaskItem extends Component {

    constructor() {
        super();
    }

    onDeleteClick(pt_id) {
        this.props.deleteProjectTask(pt_id);
    }

    drag = (ev) => {
        const { project_task } = this.props;
        ev.dataTransfer.setData("pt_id", project_task.projectSequence);
        ev.dataTransfer.setData("backlog_id", project_task.projectIdentifier);


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
        let priorityClass;
        let priorityString;

        if(project_task.priority === 1) {
            priorityClass = "bg-danger text-light";
            priorityString = "HIGH";
        }

        if(project_task.priority === 2) {
            priorityClass = "bg-warning text-light";
            priorityString = "MEDIUM";
        }

        if(project_task.priority === 3) {
            priorityClass = "bg-info text-light";
            priorityString = "LOW";
        }



        return (
        <div className="card mb-1 bg-light" draggable="true" id={project_task.projectSequence} onDragStart={this.drag} onDrop={this.drop}>
            <div className={`card-header text-primary cardHead ${priorityClass}`}>
                ID: {project_task.projectSequence} -- Priority: {priorityString}
            </div>
            <div className="card-body bg-light">
                <h5> {project_task.summary} </h5>
                
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

const mapStateToProps = state => ({
    backlog: state.backlog,
})

//Connect React component to a Redux store.
export default connect(mapStateToProps, { deleteProjectTask }) (ProjectTaskItem);
