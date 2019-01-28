import React, { Component } from "react";
import axios from "axios";

class Verified extends Component {
  state = {
    verifed: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/verified", { withCredentials: true })
      .then(response => {
        this.setState({ verifed: response.data });
      })
      .catch(err => {
        console.log("Listing Info Error", err);
        alert("Sorry something went wrong");
      });
  }
  render() {
    const { verifed } = this.state;
    return (
      <div>
        <h3>verifed projects</h3>
        <ul>
          {verifed.map(oneProject => {
            return (
              <li key={oneProject._id}>
                {oneProject.creators.length > 1 ? (
                  <h6>Group project</h6>
                ) : (
                  oneProject.creators.map((oneCreator, index) => {
                    return <h6 key={index}>{oneCreator.name}</h6>;
                  })
                )}

                <p>{oneProject.name}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Verified;
