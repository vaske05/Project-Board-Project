import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ProjecItem from './Project/ProjecItem';

class Dashboard extends Component {
    render() {
        return (
                <div className="projects">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Projects</h1>
                            <br />
                            <a href="ProjectForm.html" className="btn btn-lg btn-success">
                                Create a Project
                            </a>
                            <br />
                            <hr />

                            {/*<!-- Project Item Component -->*/ }
                            <ProjecItem></ProjecItem>
                            {/*<!-- End of Project Item Component -->*/ }
                        </div>
                    </div>
                </div>
            </div>           
        )
    }
}

export default Dashboard;
