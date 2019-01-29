import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function getProjectUrl(oneProject) {
  console.log(oneProject, "zozozozozzozo");
  return `/projects/edit/${oneProject._id}`;
}

class Verified extends Component {
  state = {
    verifed: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:4000/api/verified", { withCredentials: true })
      .then(response => {
        console.log(response);
        this.setState({ verifed: response.data });
      })
      .catch(err => {
        console.log("Listing Info Error", err);
        alert("Sorry something went wrong");
      });
  }
  render() {
    const { verifed, _id } = this.state;
    console.log(this.state);

    return (
      <div>
        <h3>verifed projects</h3>
        <ul>
          {verifed.map(oneProject => {
            console.log(oneProject);
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
                <Link to={`/projects/edit/${oneProject._id}`}>
                  <button>Edit</button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Verified;
