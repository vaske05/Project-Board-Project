import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { getProjectTask, addProjectTask } from "../../actions/projectTaskActions"

class UpdateProjectTask extends Component {

    constructor() {
        super();
        this.state = {
            id: "",
            summary: "",
            acceptanceCriteria: "",
            status: "",
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const newProjectTask = {
            id: this.state.id,
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status
        }
        this.props.addProjectTask(newProjectTask, this.props.history);

    }

    componentWillReceiveProps(nextProps) {
        const {id, summary, acceptanceCriteria, status} = nextProps.project_task;
        this.setState({id,summary,acceptanceCriteria, status});
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        const { pt_id } = this.props.match.params; 
        this.props.getProjectTask(pt_id, this.props.history);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="addProjectTask">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <Link to="/projectBoard" className="btn btn-primary">
                            <i className="fas fa-arrow-left"></i>
                            <i className=""> Back to Board</i>
                        </Link>
                    </div>
                    <div className="col-md-8 m-auto">
                        <h4 className="display-4 text-center">Update Project Task</h4>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input 
                                    value={this.state.summary}
                                    onChange={this.onChange} 
                                    type="text" 
                                    className={classnames("form-control form-control-lg", {
                                        "is-invalid": errors.summary
                                    })}
                                    name="summary"
                                    />
                                    { errors.summary &&
                                        <div className="invalid-feedback">{errors.summary}</div>

                                    } 
                                    
                            </div>
                            <div className="form-group">
                                <textarea 
                                    value={this.state.acceptanceCriteria}
                                    onChange={this.onChange} 
                                    className="form-control form-control-lg"  
                                    name="acceptanceCriteria">
                                </textarea>
                            </div>
                            <div className="form-group">
                                <select value={this.state.status} onChange={this.onChange} className="form-control form-control-lg" name="status">
                                    <option value="">Select Status</option>
                                    <option value="TO_DO">TO DO</option>
                                    <option value="IN_PROGRESS">IN PROGRESS</option>
                                    <option value="DONE">DONE</option>
                                </select>
                            </div>
                            <input type="submit" className="btn btn-primary btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    
        );
    }
}

UpdateProjectTask.propTypes = {
    addProjectTask: PropTypes.func.isRequired,
    getProjectTask: PropTypes.func.isRequired,
    project_task: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    project_task: state.project_task.project_task,
    errors: state.errors
});

export default connect(mapStateToProps, {getProjectTask, addProjectTask}) (UpdateProjectTask);
