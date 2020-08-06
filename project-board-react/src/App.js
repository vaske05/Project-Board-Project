
import React, {Component} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap import
import AddProjectTask from './components/ProjectBoard/ProjectTask/AddProjectTask';
import UpdateProjectTask from './components/ProjectBoard/ProjectTask/UpdateProjectTask';
import { BrowserRouter as Router, Route } from "react-router-dom";
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
import jwt_decode from 'jwt-decode';
import setJwtToken from "./securityUtils/setJwtToken";
import {SET_CURRENT_USER} from "./actions/types";

const token = localStorage.getItem("jwtToken");
if(token) {
  setJwtToken(token);
  const decodedToken = jwt_decode(token);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decodedToken
  });
  const currentTime = Date.now()/1000;
  if(decodedToken.exp < currentTime) {
    //handle logout
    window.location.href = "/";
  }
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
          <Route exact path="/dashboard" component={Dashboard} />

          <Route exact path="/addProject" component={AddProject}/>
          <Route exact path="/updateProject/:id" component={UpdateProject}/>
          
          <Route exact path="/projectBoard/:id" component={ProjectBoard} />
    
          <Route exact path="/addProjectTask/:id" component={AddProjectTask} />
          <Route exact path="/updateProjectTask/:backlog_id/:pt_id" component={UpdateProjectTask} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;