import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import api from "../../api"


import "./style/NotVerified.scss";

class NotVerifed extends Component {
  state = {
    nonverifed: []
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    api
      .get("/notverified", { withCredentials: true })
      .then(response => {
        this.setState({ nonverifed: response.data });
      })
      .catch(err => {
        console.log("Listing Info Error", err);
        alert("Sorry something went wrong");
      });
  }

  render() {
    const { nonverifed } = this.state;

    return (
      <section id="NotVerified">
        <h2>Nonverifed projects</h2>
        <div className="container">
          <ul className="row justify-content-center">
            {nonverifed.map(oneProject => {
              return (
                <li key={oneProject._id} className="col-lg-3 col-md-4 col-sm-6">
                  <div className="li-content">
                    {oneProject.creators.length > 1 ? (
                      <h6>Group project</h6>
                    ) : (
                        oneProject.creators.map((oneCreator, index) => {
                          return <h6 key={index}>{oneCreator.name}</h6>;
                        })
                      )}

                    <p>{oneProject.name}</p>

                    <Link to={`/projects/${oneProject.searchId}`}>
                      <button className="btn btn-primary">Details</button>
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    );
  }
}

export default NotVerifed;
