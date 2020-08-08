import React, { Component } from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {logout} from "../../actions/securityActions";

class Header extends Component {


  constructor(props) {
    super(props);
  }

  logout() {
    this.props.logout(this.props.history);
  }

  render() {

    const {user, isAuthenticated} = this.props.security;

    const userIsAuthenticated = (
        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
              Dashboard
              </Link>
          </li>
        </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link " to="/dashboard">
                <i className="fas fa-user-circle mr-1"></i>
                {user.fullName}
              </Link>
            </li>
            <li className="nav-item cursorPointer">
              <i className="nav-link" onClick={this.logout.bind(this)}>
                Logout
              </i>
            </li>
          </ul>
        </div>
    )

    const userIsNotAuthenticated = (
        <div className="collapse navbar-collapse" id="mobile-nav">
          <Link to="/" className="navbar-brand">
            Project Management Tool
          </Link>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link " to="/register">
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Log In
              </Link>
            </li>
          </ul>
        </div>
    )

    let headerLinks
    if(isAuthenticated) {
      headerLinks = userIsAuthenticated;
    } else {
      headerLinks = userIsNotAuthenticated;
    }

    return (
      <nav className="navbar navbar-expand-sm navbar-dark greenPrimary mb-4">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {headerLinks}

        </div>
      </nav>
    );
  }
}

Header.propTypes ={
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  security: state.security
})

export default connect(mapStateToProps, {logout})(Header) ;
