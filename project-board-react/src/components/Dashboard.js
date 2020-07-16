import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProjecItem from "./Project/ProjecItem";
import CreateProjectButton from "./Project/CreateProjectButton";

class Dashboard extends Component {
  render() {
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

              {/*<!-- Project Item Component -->*/}
              <ProjecItem></ProjecItem>
              {/*<!-- End of Project Item Component -->*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
