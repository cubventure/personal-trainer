import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Customers from './components/Customers';
import Navbar from './components/Nav';
import Trainings from './components/Trainings';
import CalendarPage from './components/CalendarPage';
import Calendar from "react-big-calendar";
import moment from "moment";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span className="App-title">&nbsp; My Personal Trainer</span>
        </header>
        
        <BrowserRouter>
          <div>
            
            <Navbar />

            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/customerlist" component={Customers}/>
              <Route path="/traininglist" component={Trainings}/>
              <Route path="/calendar" component={CalendarPage}/>
            </Switch>

          </div>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
