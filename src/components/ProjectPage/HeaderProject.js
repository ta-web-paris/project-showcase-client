import React, { Component } from "react";
import axios from "axios";

import ProgressBar from "./ProgressBar";
import ProjectSuggestion from "./ProjectSuggestion";
import ProjectSuggestionThumbnail from "./ProjectSuggestionThumbnail";

import "./style/HeaderProject.scss";

import github from "../../images/icon-github.svg";
import linkedin from "../../images/icon-linkedin.svg";

class ProjectHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creators: [],
      tools: [],
      projectCredentials: [],
      0: {}
    };
  }

  componentDidMount() {
    const { params } = this.props.match;
    console.log(params);
    // retrieve the info from the API as soon as the component loads
    axios
      .get(`http://localhost:4000/api/projects/${params.projectId}`, {
        withCredentials: true
      })
      .then(response => {
        console.log(response.data);
        this.setState(response.data);
      })
      .catch(err => {
        console.log("Project Details ERROR", err);
        alert("Sorry! Something went wrong.");
      });
  }

  render() {
    console.log(this.state[0].tools);
    console.log(this.state[0]);
    const {
      name,
      creators,
      screenshotUrl,
      description,
      gitHubUrl,
      projectUrl,
      projectType,
      tools,
      likes,
      projectCredentials,
      display,
      bootcamp,
      squad
    } = this.state;

    return (
      <section id="ProjectHeader">
        <ProgressBar />

        <div className="row row1">
          <div className="project-details col-lg-5 col-md-12 col-sm-12">
            <div className="top-details">
              <h1 className="h1">{this.state[0].name}</h1>
              <div className="type">
                <p className="mono-light">{this.state[0].projectType}</p>
                <p className="mono-light">{this.state[0].squad}</p>
              </div>
              <p>{this.state[0].description}</p>
              <div className="tools">
                <p className="h6">
                  <b>TOOLS :</b>
                </p>
                <ul>
                  {this.state.tools.map((oneTool, index) => {
                    return (
                      <li key={index}>
                        <p className="space">{oneTool}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="link">
                <p className="h6">
                  <b>PROJECT :</b>
                </p>
                <p className="space">
                  <a href="projecturl">{this.state[0].projectUrl}</a>
                </p>
              </div>
            </div>
            <div className="bottom-details">
              {creators.map((oneInfo, index) => {
                return (
                  <ul className="creatorInfo">
                    <li key={index}>
                      <p className="mono-light">
                        <b>{oneInfo.name}</b>
                      </p>
                      <div className="creator-links">
                        {oneInfo.linkedInUrl ? (
                          <a href={oneInfo.linkedInUrl}>
                            <img
                              src={linkedin}
                              alt="linkedin"
                              className="socialmedias"
                            />
                          </a>
                        ) : null}
                        {oneInfo.linkedInUrl ? (
                          <a href={gitHubUrl}>
                            <img
                              src={github}
                              alt="github"
                              className="socialmedias"
                            />
                          </a>
                        ) : null}
                      </div>
                    </li>
                  </ul>
                );
              })}
            </div>
          </div>

          <div className="project-image col-lg-7 col-md-12 col-sm-12">
            <img
              src={this.state[0].screenshotUrl}
              className="big-img"
              alt={name}
            />
          </div>
        </div>

        <hr />

        <ProjectSuggestion />

        <ProjectSuggestionThumbnail />
      </section>
    );
  }
}

export default ProjectHeader;
