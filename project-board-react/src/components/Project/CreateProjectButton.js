import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const CreateProjectButton = () => {
  // Functional component
  return (
    <React.Fragment>
      <Link to="/addProject" className="btn btn-lg btn-success">
        Create a Project
      </Link>
    </React.Fragment>
  );
};

export default CreateProjectButton;
