import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const CreateProjectButton = () => {
  // Functional component
  return (
    <Fragment>
      <Link to="/addProject" className="btn btn-lg btn-success">
        Create a Project
      </Link>
    </Fragment>
  );
};

export default CreateProjectButton;
