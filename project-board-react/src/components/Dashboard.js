import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjecItem from "./Project/ProjecItem";
import CreateProjectButton from "./Project/CreateProjectButton";
import PropTypes from 'prop-types';
import {gelAllProjects} from '../actions/projectActions';
import { connect } from "react-redux";


class Dashboard extends Component {

  constructor() {
    super();
  }

  componentDidMount() {
    this.props.gelAllProjects();
  }

  render() {

    const {projects} = this.props.project;

    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Projects</h1>
              <br />
              <CreateProjectButton></CreateProjectButton>
              <br />
              <hr />

              {
                /* Project Item Component */

                projects.length < 1 ? <div className="alert alert-info text-center" role="alert">No projects found.</div> :

                projects.map(project=> (
                  <ProjecItem key={project.id} project={project}></ProjecItem>
                ))
              
                /* End of Project Item Component */
              }

            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  gelAllProjects: PropTypes.func.isRequired,
  project:  PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  project: state.project // from index.js - combine reducers
})

export default connect(mapStateToProps, { gelAllProjects })(Dashboard);
