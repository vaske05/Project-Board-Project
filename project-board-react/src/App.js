import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap import
import Navbar from './components/Navbar';
import ProjectBoard from './components/ProjectBoard';
import AddProjectTask from './components/ProjectTask/AddProjectTask';
import UpdateProjectTask from './components/ProjectTask/UpdateProjectTask';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import  store  from "./store";
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard';

function App() {
  return (

    <Provider store={store}>
      <Router>
        <div className="App">
          <Header/>
          <Dashboard></Dashboard>
            <Route exact path="/projectBoard" component={ProjectBoard} /> 
          { /* <Route exact path="/addProjectTask" component={AddProjectTask} /> */ }
          { /* <Route exact path="/update/:pt_id" component={UpdateProjectTask} /> */}
        </div>
      </Router>
    </Provider>
  );
}

export default App;