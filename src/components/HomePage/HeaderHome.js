import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar";

import "./style/HeaderHome.scss";

import logo from "../../images/ironhack-logo.png";

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
        <NavLink exact to="/">
          <img src={logo} alt="logo" className="logo" />
        </NavLink>
        <h6 className="mono-light">
          Welcome to Ironhack showcases plateform & discover
        </h6>
        <h1>212 squads, 23 alumnis, 363 projects</h1>
        <div className="menu">
          {currentUser ? (
            <div className="user">
              <NavLink to="/add-project">
                <p>Add Project</p>
              </NavLink>
              <NavLink to="/settings">
                <p>User Settings</p>
              </NavLink>

              <NavLink to="/verified">
                <p>Verifed Projects</p>
              </NavLink>

              <NavLink to="/notverified">
                <p>Nonverifed Projects</p>
              </NavLink>

              <p onClick={event => logUserOut(event)}>Log out</p>
            </div>
          ) : (
            <NavLink to="/login">
              <p>Log in</p>
            </NavLink>
          )}
        </div>
        <SearchBar />
      </section>
    );
  }
}

export default HomeHeader;
