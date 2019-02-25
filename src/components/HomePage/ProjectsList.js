import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Hits, connectStateResults } from "react-instantsearch-dom";

import "./style/ProjectsList.scss";
import Filters from "./FilterButton";

function getProjectUrl(oneProject) {
  return `/projects/${oneProject.searchId}`;
}

function toggleStyle(evt) {
  const el = evt.target || evt.srcElement;

  if (this === "in" && !el.classList.contains("is-active")) {
    window.setTimeout(() => {
      el.classList.add("is-active");
    }, 200);
  } else if (this === "out") {
    el.classList.remove("is-active");
  }
}

function parseProjects() {
  const items = document.querySelectorAll(".ais-Hits-list .ais-Hits-item");
  if (!items.length)
    window.setTimeout(() => {
      return parseProjects();
    }, 500);
  else {
    items.forEach(item => {
      item.onmouseenter = toggleStyle.bind("in");
      item.onmouseleave = toggleStyle.bind("out");
    });
  }
}

const Result = ({ hit }) => (
  <div key={hit._id} className="li-content col-lg-4 col-md-6 col-sm-12">
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
            <h6 className="name">Group project</h6>
          ) : (
            hit.creators.map((oneCreator, index) => {
              return (
                <h6 key={index} className="name">
                  {oneCreator.name}
                </h6>
              );
            })
          )}
        </div>
        <div className="hidden-content">
          <p>{hit.description}</p>
        </div>
      </div>
    </Link>
  </div>
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

  componentDidUpdate() {
    // if (this.state.projects.length) {
    //   console.log("yahoo");
    //   parseProjects(); // exec only once the data are fetched from db
    // } else {
    //   console.log("meeehhhh");
    // }
  }

  componentDidMount() {
    console.log("list mounted");

    window.scrollTo(0, 0);
    axios
      .get("http://localhost:4000/api/", { withCredentials: true })
      .then(response => {
        this.setState({ projects: response.data }, () => {
          parseProjects();
        });
      })
      .catch(err => {
        console.log("Listing Info Error", err);
        alert("Sorry something went wrong");
      });
  }

  render() {
    return (
      <section id="ProjectsList">
        <Filters />
        <ConditionalHits />
      </section>
    );
  }
}

export default ProjectsList;
