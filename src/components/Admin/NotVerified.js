import React, { Component } from "react";
import axios from "axios";

class NotVerifed extends Component {
  state = {
    nonverifed: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/notverified", { withCredentials: true })
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
      <div>
        <h3>nonverifed projects</h3>
        <ul>
          {nonverifed.map(oneProject => {
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
                <button>Edit</button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default NotVerifed;
