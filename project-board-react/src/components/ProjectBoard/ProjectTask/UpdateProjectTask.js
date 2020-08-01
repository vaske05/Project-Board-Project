import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { getProjectTask, updateProjectTask } from "../../../actions/backlogActions";

class UpdateProjectTask extends Component {

    constructor(props) {
        super(props);

        const { backlog_id } = this.props.match.params;

        this.state = {
            id:"",
            projectSequence: "",
            summary: "",
            acceptanceCriteria: "",
            status: "",
            priority: 0,
            dueDate: "",
            projectIdentifier: backlog_id,
            createAt: "",
            errors: {}
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const updateProjectTask = {
            id: this.state.id,
            projectSequence: this.state.projectSequence,
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status,
            priority: this.state.priority,
            dueDate: this.state.dueDate,
            projectIdentifier: this.state.projectIdentifier,
            createAt: this.state.createAt
        }
        
        this.props.updateProjectTask(this.state.projectIdentifier, this.state.projectSequence, updateProjectTask, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        const {
            id,
            projectSequence, 
            summary, 
            acceptanceCriteria, 
            status, 
            priority,
            dueDate, 
            projectIdentifier, 
            createAt
        } = nextProps.project_task;

        this.setState({
            id,
            projectSequence, 
            summary, 
            acceptanceCriteria, 
            status, 
            priority,
            dueDate, 
            projectIdentifier, 
            createAt
        });

        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        const { pt_id, backlog_id } = this.props.match.params;
        this.props.getProjectTask(backlog_id, pt_id, this.props.history);
    }

    render() {
        const { backlog_id } = this.props.match.params;
        const { errors } = this.state;
        return (
            <div className="addProjectTask">
              <div className="container">
                <div className="row">
                  <div className="col-md-8">
                    <Link to={`/projectBoard/${backlog_id}`} className="btn btn-success">
                      <i className="fas fa-arrow-left"></i>
                      <i className=""> Back to Board</i>
                    </Link>
                  </div>
                  <div className="col-md-8 m-auto">
                    <h4 className="display-4 text-center">Update Project Task</h4>
                    <p className="lead text-center">Project Name: {this.state.projectIdentifier} <br></br> Project Task ID: {this.state.projectSequence}</p>
                    <form className="form" onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <input
                          type="text"
                          className={classnames("form-control form-control-lg", {
                            "is-invalid": errors.summary,
                          })}
                          name="summary"
                          value={this.state.summary}
                          onChange={this.onChange}
                          placeholder="Project Task summary"
                        />
                        {errors.summary && (
                          <div className="invalid-feedback">{errors.summary}</div>
                        )}
                      </div>
                      <div className="form-group">
                        <textarea
                          className="form-control form-control-lg"
                          placeholder="Acceptance Criteria"
                          name="acceptanceCriteria"
                          value={this.state.acceptanceCriteria}
                          onChange={this.onChange}
                        ></textarea>
                      </div>
      
                      <h6>Due Date</h6>
                      <div className="form-group">
                        <input
                          type="date"
                          className="form-control form-control-lg"
                          name="dueDate"
                          value={this.state.dueDate}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <select className="form-control form-control-lg" name="priority" value={this.state.priority} onChange={this.onChange}>
                          <option value={0}>Select Priority</option>
                          <option value={1}>High</option>
                          <option value={2}>Medium</option>
                          <option value={3}>Low</option>
                        </select>
                      </div>
      
                      <div className="form-group">
                        <select
                          className="form-control form-control-lg"
                          name="status"
                          value={this.state.status}
                          onChange={this.onChange}
                        >
                          <option value="">Select Status</option>
                          <option value="TO_DO">TO DO</option>
                          <option value="IN_PROGRESS">IN PROGRESS</option>
                          <option value="DONE">DONE</option>
                        </select>
                      </div>
                      <input
                        type="submit"
                        className="btn btn-success btn-block mt-4"
                        value="Update"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          );
    }
}

UpdateProjectTask.propTypes = {
    updateProjectTask: PropTypes.func.isRequired,
    getProjectTask: PropTypes.func.isRequired,
    project_task: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    project_task: state.backlog.project_task,
    errors: state.errors
});

//Connect React component to a Redux store.
export default connect(mapStateToProps, {getProjectTask, updateProjectTask}) (UpdateProjectTask);
