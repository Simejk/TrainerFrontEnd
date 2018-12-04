import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

class NavigatorComponent extends Component {
  render() {
    return (
    <header className="App-header">
        <div className="App">
          <img src={logo} className="App-logo" alt="logo" />
        </div>

          <div className="App-title">
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/">| Home </Link>
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/customers">| Customer list |</Link>
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/trainings"> Trainings |</Link>
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/calendar"> Calendar |</Link>
          </div>
      </header>

    );
   }

}

export default NavigatorComponent;
