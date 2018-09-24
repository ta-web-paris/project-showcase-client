import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';

import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import Login from './components/Login';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    axios.get("http://localhost:4000/api/check-login", { withCredentials: true})
      .then(response => {
        const { userDoc } = response.data;
        this.userLoggedIn(userDoc);
      })
      .catch(err => {
        console.log(err);
        alert("Sorry, there was an error");
      });
  }

  userLoggedIn = (user) => {
    this.setState({
      currentUser: user
    });
  }

  logUserOut = () => {
    axios.delete("http://localhost:4000/api/logout", { withCredentials: true})
      .this(response => {
        const { userDoc } = response.data;
        this.userLoggedIn(userDoc);
      })
      .catch(err => {
        console.log(err);
        alert("Sorry, there was an error");
      });
  }

  render() {
    const {currentUser} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>This is our Project Showcase app!</h1>
          <NavLink exact to="/">Home</NavLink>
          {currentUser ? (
            <button onClick={this.logUserOut}>Log out</button>
          ) : (
            <NavLink to="/login">Log in</NavLink>
          )}
        </header>
        <Switch>
          <Route exact path="/" component={ Home }/>
          <Route path="/login" render={() => currentUser? <Redirect to="/" /> : <Login handleLogIn={this.userLoggedIn}/> }/>
          <Route component={ ErrorPage }/>
        </Switch>
        <footer></footer>
      </div>
    );
  }
}

export default App;
