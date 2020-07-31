import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProjectTaskItem from './ProjectTask/ProjectTaskItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBacklog } from '../../actions/projectTaskActions';
import { status } from '../../constants';
import { addProjectTask } from '../../actions/projectTaskActions';
import { getProjectTask } from '../../actions/projectTaskActions';
import { mapTaskStatus, removeClass } from '../../helpers';


class ProjectBoard extends Component {

    constructor() {
        super();

        this.updateProjectStatus = this.updateProjectStatus.bind(this);
        this.drop = this.drop.bind(this);
        //this.mapTaskStatus = this.mapTaskStatus.bind(this);
    }

    componentDidMount() {
        this.props.getBacklog();
    }

    allowDrop(ev) {
        ev.preventDefault();
    }

    async updateProjectStatus(id, targetStatusId) {
        await this.props.getProjectTask(id, this.props.history);
        const projectTask = this.props.project_tasks.project_task;

        projectTask.status = mapTaskStatus(targetStatusId);
        this.props.addProjectTask(projectTask, this.props.history);
    } 

    drop(ev) {
        const targetStatusId = ev.target.id;
        
        // old
        // const divs = document.getElementsByClassName("statusDiv");
        // removeClass(divs, "customShadow");

        //new
        const divToDo = document.getElementById("divToDo");
        const divInProgress = document.getElementById("divInProgress");
        const divDone = document.getElementById("divDone");

        divToDo.classList.remove("customShadowGrey");
        divInProgress.classList.remove("customShadowBlue");
        divDone.classList.remove("customShadowGreen");
        //

        if(targetStatusId === "divToDo" || targetStatusId === "divDone" || targetStatusId === "divInProgress") {
            ev.preventDefault();
            const id = ev.dataTransfer.getData("id");
            this.updateProjectStatus(id, targetStatusId);
            ev.target.appendChild(document.getElementById(id));

        } else {
            ev.returnValue = false;
        }
    }

    render() {


        const { project_tasks } = this.props.project_tasks;

        let BoardContent;
        let todoItems = [];
        let inProgressItems = [];
        let doneItems = [];

        const BoardAlgorithm = projectTasks => {
            if (projectTasks.length < 1) {
                return (
                    <div className="alert alert-info text-center" role="alert">No project tasks on this board.</div>
                )
            } else {
                const tasks = projectTasks.map(project_task => (
                    <ProjectTaskItem key={project_task.id} project_task={project_task}></ProjectTaskItem>
                ));

                for (let i = 0; i < tasks.length; i++) {
                    if (tasks[i].props.project_task.status === status.TO_DO) {
                        todoItems.push(tasks[i]);
                    }

                    if (tasks[i].props.project_task.status === status.DONE) {
                        doneItems.push(tasks[i]);
                    }

                    if (tasks[i].props.project_task.status === status.IN_PROGRESS) {
                        inProgressItems.push(tasks[i]);
                    }

                }

                return (
                    <React.Fragment>
                        <div className="container">
                            <div className="row">

                                <div className="col-md-4">
                                    <div className="card text-center mb-2">
                                        <div className="card-header bg-secondary text-white">
                                            <h3>TO DO</h3>
                                        </div>
                                    </div>
                                    <div className="mb-2 statusDiv" id="divToDo" onDrop={this.drop} onDragOver={this.allowDrop}>
                                        {todoItems}
                                    </div>
                                    
                                </div>

                                <div className="col-md-4">
                                    <div className="card text-center mb-2">
                                        <div className="card-header bg-primary text-white">
                                            <h3>In Progress</h3>
                                        </div>
                                    </div>
                                    <div className="mb-2 statusDiv" id="divInProgress" onDrop={this.drop} onDragOver={this.allowDrop}>
                                        {inProgressItems}
                                    </div>


                                    
                                </div>

                                <div className="col-md-4">
                                    <div className="card text-center mb-2">
                                        <div className="card-header bg-success text-white">
                                            <h3>Done</h3>
                                        </div>
                                    </div>
                                    <div className="mb-2 statusDiv" id="divDone" onDrop={this.drop} onDragOver={this.allowDrop}>
                                        {doneItems}
                                    </div>
                                    
                                </div>

                            </div>
                        </div>
                    </React.Fragment>
                )
            }
        };

        BoardContent = BoardAlgorithm(project_tasks);


        return (
            <div className="container">
                <Link to="/addProjectTask" className="btn btn-success mb-3">
                    <i className="">Add Project Task </i>
                    <i className="fas fa-plus-circle"></i>
                </Link>
                <br />
                <hr />
                {
                    // Backlog STARTS HERE
                }
                {BoardContent}

            </div>
        );
    }
};

ProjectBoard.propTypes = {
    getProjectTask: PropTypes.func.isRequired,
    addProjectTask: PropTypes.func.isRequired,
    getBacklog: PropTypes.func.isRequired,
    project_tasks: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    project_tasks: state.project_task
})

export default connect(mapStateToProps, { getBacklog, getProjectTask, addProjectTask })(ProjectBoard);
