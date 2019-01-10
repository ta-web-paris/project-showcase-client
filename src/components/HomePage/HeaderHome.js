import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar";

import './style/HeaderHome.scss';

class HomeHeader extends Component {
  state = {};

  logUserOut(event) {
    console.log("gogoggogogo", this.props);
    this.setState({ isLoginChecked: false });
  }

  render() {
    const { currentUser, logUserOut } = this.props;
    return (
      <section id="HomeHeader" className="col-12">
          <h1>This is our Project Showcase app!</h1>
          <div className= "menu">
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/projects">Projects List</NavLink>
            {currentUser ? (
              <div>
                <NavLink to="/add-project">Add Project</NavLink>
                <NavLink to="/settings">User Settings</NavLink>
                <b>{currentUser.email}</b>
                <button onClick={event => logUserOut(event)}>Log out</button>
              </div>
            ) : (
              <NavLink to="/login">Log in</NavLink>
            )}
          </div>
          <SearchBar />
      </section>
    );
  }
}

export default HomeHeader;
