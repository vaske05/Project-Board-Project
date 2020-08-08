import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBacklog } from '../../actions/backlogActions';
import Backlog from './Backlog';


class ProjectBoard extends Component {

    constructor() {
        super();
        this.state = {
            errors: {}
        };
    }

    componentDidMount() {
        this.props.getBacklog(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }


    render() {

        const { id } = this.props.match.params;
        const { project_tasks } = this.props.backlog;
        const {errors} = this.state;

        let BoardContent;
        const BoardAlgorithm = (errors, project_tasks) => {

            if(project_tasks.length < 1) {

                if(errors.projectNotFound) {
                    return (
                        <div className="alert alert-danger text-center" role="alert"> { errors.projectNotFound } </div>  
                    );
                }
                else if(errors.projectIdentifier) {
                    return (
                        <div className="alert alert-danger text-center" role="alert"> { errors.projectIdentifier } </div>
                    );
                }
                else {
                    return (
                        <div className="alert alert-info text-center" role="alert">No project tasks on this board.</div>
                    )
                }
            } 
            else {
                return (
                    <Backlog history={this.props.history} project_tasks={project_tasks}></Backlog>
                )
            }
        }

        BoardContent = BoardAlgorithm(errors, project_tasks);

        return (
            <div className="container">
                <Link to={`/addProjectTask/${id}`} className="btn btn-success mb-3">
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
    getBacklog: PropTypes.func.isRequired,
    backlog: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    backlog: state.backlog,
    errors: state.errors
})

//Connect React component to a Redux store.
export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
