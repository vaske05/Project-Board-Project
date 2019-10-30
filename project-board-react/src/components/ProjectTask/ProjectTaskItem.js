import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProjectTask } from "../../actions/projectTaskActions";
import { addClass } from '../../helpers';


class ProjectTaskItem extends Component {

    onDeleteClick(pt_id) {
        this.props.deleteProjectTask(pt_id);
    }

    drag(ev) {
        ev.dataTransfer.setData("id", ev.target.id);
        const divs = document.getElementsByClassName("statusDiv");
        addClass(divs, "customShadow");
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

export default connect(null, { deleteProjectTask }) (ProjectTaskItem);
