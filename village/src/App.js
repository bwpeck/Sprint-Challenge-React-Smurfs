import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom'

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
let url = 'http://localhost:3333/smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount() {

    axios
      .get(url)
      .then(response => {
        this.setState({ smurfs: response.data })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className="App">
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/SmurfForm">Add Smurf</NavLink>
        </div>
        <div>
          <Route
            path="/"
            exact
            render={(props) => {
              return (
                <Smurfs
                  {...props}
                  smurfs={this.state.smurfs}
                  delete={this.delete}
                  edit={this.edit} />
              );
            }} />
          <Route
            path="/SmurfForm"
            exact
            render={(props) => {
              return (<SmurfForm{...props} add={this.addSmurf} {...props} />);
            }} />
        </div>
        <SmurfForm />
        <Smurfs smurfs={this.state.smurfs} />
      </div>
    );
  }
}

export default App;
