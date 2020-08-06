import React, { Component } from 'react'
import ProjectTaskItem from './ProjectTask/ProjectTaskItem';
import { status } from '../../constants';
import { getProjectTask, addProjectTask, getBacklog } from '../../actions/backlogActions';
import { mapTaskStatus } from '../../helpers';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';




class Backlog extends Component {

    constructor() {
        super();
        this.updateProjectStatus = this.updateProjectStatus.bind(this);
        this.drop = this.drop.bind(this);
    }


    allowDrop(ev) {
        ev.preventDefault();
    }

    async updateProjectStatus(backlog_id, pt_id, targetStatusId) {
        await this.props.getProjectTask(backlog_id, pt_id, this.props.history);
        const projectTask = this.props.backlog.project_task;

        projectTask.status = mapTaskStatus(targetStatusId);
        this.props.addProjectTask(backlog_id, projectTask, this.props.history);
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
            const pt_id = ev.dataTransfer.getData("pt_id");
            const backlog_id = ev.dataTransfer.getData("backlog_id");

            this.updateProjectStatus(backlog_id, pt_id, targetStatusId);
            ev.target.appendChild(document.getElementById(pt_id));

        } else {
            ev.returnValue = false;
        }
    }


    render() {

        const { project_tasks } = this.props.backlog
        
        let todoItems = [];
        let inProgressItems = [];
        let doneItems = [];


        
            const tasks = project_tasks.map(project_task => (
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
}

Backlog.propTypes = {
    getProjectTask: PropTypes.func.isRequired,
    addProjectTask: PropTypes.func.isRequired,
    getBacklog: PropTypes.func.isRequired,
    backlog: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    backlog: state.backlog
})

export default connect(mapStateToProps, { getBacklog, getProjectTask, addProjectTask })(Backlog);


