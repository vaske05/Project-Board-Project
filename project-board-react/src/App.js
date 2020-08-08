import React, {Component} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap import
import AddProjectTask from './components/ProjectBoard/ProjectTask/AddProjectTask';
import UpdateProjectTask from './components/ProjectBoard/ProjectTask/UpdateProjectTask';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store  from "./store";
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard';
import AddProject from './components/Project/AddProject';
import UpdateProject from './components/Project/UpdateProject';
import ProjectBoard from './components/ProjectBoard/ProjectBoard';
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import SecuredRoute from "./securityUtils/SecureRoute";
import jwt_decode from 'jwt-decode';
import setJwtToken from "./securityUtils/setJwtToken";
import {SET_CURRENT_USER} from "./actions/types";
import {startLogoutTimer} from "./actions/securityActions";

/*
 * Set token and start timer logout when page gets reloaded
 */
const token = localStorage.getItem("jwtToken");
if(token) {
  setJwtToken(token);
  const decodedToken = jwt_decode(token);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decodedToken
  });
  startLogoutTimer(decodedToken.exp)(store.dispatch);
}

function App() {
  return (

    <Provider store={store}>
      <Router>
        <div className="App">
          <Header/>

          { /* Public Routes */ }
          <Route exact path="/" component={Landing}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/login" component={Login}></Route>

          {/*Private Routes*/}
          <Switch>
            <SecuredRoute exact path="/dashboard" component={Dashboard} />

            <SecuredRoute exact path="/addProject" component={AddProject}/>
            <SecuredRoute exact path="/updateProject/:id" component={UpdateProject}/>

            <SecuredRoute exact path="/projectBoard/:id" component={ProjectBoard} />

            <SecuredRoute exact path="/addProjectTask/:id" component={AddProjectTask} />
            <SecuredRoute exact path="/updateProjectTask/:backlog_id/:pt_id" component={UpdateProjectTask} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;