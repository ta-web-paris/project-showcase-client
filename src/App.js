import React, { Component } from 'react';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';

import './App.css';

import api from './api.js';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import Login from './components/Login';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    api.get('/check-login')
      .then(response => {
        const { userDoc } = response.data;
        this.userLoggedIn(userDoc);
      })
      .catch(err => {
        console.log(err);
        alert('Sorry, there was an error.');
      });
  }

  userLoggedIn = (user) => {
    this.setState({
      currentUser: user
    });
  }

  logUserOut = () => {
    api.delete('/logout')
      .then(response => {
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
            <React.Fragment>
              <b>{currentUser.email}</b>
              <button onClick={this.logUserOut}>Log out</button>
            </React.Fragment>
          ) : (
            <NavLink to="/login">Log in</NavLink>
          )}
        </header>

        <Switch>
          <Route exact path="/" component={ Home }/>
          <Route path="/login" render={() =>
            currentUser ? <Redirect to="/" /> : <Login handleLogIn={this.userLoggedIn}/>
          }/>
          <Route component={ ErrorPage }/>
        </Switch>

        <footer></footer>
      </div>
    );
  }
}


export default App;
