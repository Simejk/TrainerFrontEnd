import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import CustomerList from './CustomerList';
import CustomerTrainings from './CustomerTrainings';
import Homepage from './Homepage';
import Calendar from './Calendar'
import NavigatorComponent from './NavigatorComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <NavigatorComponent/>
              <Switch>
                 <Route exact path="/" component={Homepage}/>
                 <Route path="/customers" component={CustomerList}/>
                 <Route path="/trainings" component={CustomerTrainings}/>
                 <Route path="/calendar" component={Calendar}/>
                 <Route render={() => <h1>Page not found</h1>} />
              </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
  //<CustomerList/>
//  <CustomerTrainings/>
}

export default App;
