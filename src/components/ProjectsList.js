import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Hits, Highlight, connectStateResults } from "react-instantsearch-dom";

import "./style/ProjectsList.scss";
import Filters from "./FilterButton";

function getProjectUrl(oneProject) {
  return `/projects/${oneProject._id}`;
}

const Result = ({ hit }) => (
  <ul>
    <li key={hit._id} className="col-lg-4 col-md-6 col-sm-12">
      <div className="li-content">
        <Link to={getProjectUrl(hit)}>
          <img src={hit.screenshotUrl} alt="project img" className="image" />
          <div className="content">
            <div className="top-content">
              <p>
                <b>{hit.name}</b>
              </p>
            </div>
            <div className="bottom-content">
              <h6>{hit.projectType}</h6>
              {hit.creators.length > 1 ? (
                <h6>Group project</h6>
              ) : (
                hit.creators.map((oneCreator, index) => {
                  return <h6 key={index}>{oneCreator.name}</h6>;
                })
              )}
            </div>
          </div>
        </Link>
      </div>
    </li>
  </ul>
);

const ConditionalHits = connectStateResults(({ searchState }) =>
  searchState && searchState.query ? (
    <div>
      {/* Hits gets all of the results and maps over them and passes each individual result to the hitComponent. It will render multiple Result components each with their own hit as a prop */}
      <Hits hitComponent={Result} />
      {/* Result is the reference to the "Single Hit" component */}
    </div>
  ) : (
    <Hits hitComponent={Result} />
  )
);

class ProjectsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    axios
      .get("http://localhost:4000/api/", { withCredentials: true })
      .then(response => {
        this.setState({ projects: response.data });
      })
      .catch(err => {
        console.log("Listing Info Error", err);
        alert("Sorry something went wrong");
      });
  }

  render() {
    const { projects } = this.state;

    return (
      <section id="ProjectsList">
        <Filters />
        <ConditionalHits />
      </section>
    );
  }
}

export default ProjectsList;
