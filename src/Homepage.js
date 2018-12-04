import React from 'react';
import './App.css';

class Homepage extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1 className="Home">Hello!</h1>
          <h3>This app is the front end to a database that contains information about
          customers and their trainings. </h3>
        </header>
      </div>
    );
  }
}



export default Homepage;
