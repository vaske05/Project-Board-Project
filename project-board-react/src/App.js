import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap import
import Navbar from './components/Navbar';
import ProjectBoard from './components/ProjectBoard';
import AddProjectTask from './components/ProjectTask/AddProjectTask';
import UpdateProjectTask from './components/ProjectTask/UpdateProjectTask';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store  from "./store";
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard';
import AddProject from './components/Project/AddProject';
import UpdateProject from './components/Project/UpdateProject';

function App() {
  return (

    <Provider store={store}>
      <Router>
        <div className="App">
          <Header/>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/addProject" component={AddProject}/>
          <Route path="/updateProject/:id" component={UpdateProject}/>


          <Route path="/projectBoard" component={ProjectBoard} /> 
          <Route exact path="/addProjectTask" component={AddProjectTask} />
          <Route exact path="/updateProjectTask/:pt_id" component={UpdateProjectTask} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;