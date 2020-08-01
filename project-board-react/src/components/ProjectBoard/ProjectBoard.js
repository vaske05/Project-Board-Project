import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBacklog } from '../../actions/backlogActions';
import Backlog from './Backlog';


class ProjectBoard extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        this.props.getBacklog(this.props.match.params.id);
    }


    render() {

        const { id } = this.props.match.params;
        const { project_tasks } = this.props.backlog;

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
                <Backlog history={this.props.history} project_tasks={project_tasks}></Backlog>
            </div>
        );
    }
};

ProjectBoard.propTypes = {
    getBacklog: PropTypes.func.isRequired,
    backlog: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    backlog: state.backlog
})

//Connect React component to a Redux store.
export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
