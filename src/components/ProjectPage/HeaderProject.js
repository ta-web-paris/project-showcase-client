import React, { Component } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";

import ProgressBar from "./ProgressBar";
import ProjectSuggestion from "./ProjectSuggestion";
import ProjectSuggestionThumbnail from "./ProjectSuggestionThumbnail";

import githubLogo from "../../images/icon-github.svg";
import linkedinLogo from "../../images/icon-linkedin.svg";

import "./style/HeaderProject.scss";

class ProjectHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectInfo: {
        name: "",
        projectType: "",
        squad: "",
        description: "",
        gitHubUrl: " ",
        projectUrl: "",
        github: "",
        linkedin: "",
        screenshotUrl: "",
        likes: "",
        tools: [],
        creators: [],
        projectCredentials: []
      }
    };
  }

  componentDidMount() {
    console.log(this.props);
    window.scrollTo(0, 0);
    const { params } = this.props.match;
    axios
      .get(`http://localhost:4000/api/projects/${params.projectId}`, {
        withCredentials: true
      })
      .then(response => {
        this.setState({
          projectInfo: response.data
        });
      })
      .catch(err => {
        console.log("Project Details ERROR", err);
        alert("Sorry! Something went wrong.");
      });
  }

  render() {
    const {
      name,
      projectType,
      squad,
      description,
      gitHubUrl,
      projectUrl,
      screenshotUrl,
      likes,
      tools,
      creators
    } = this.state.projectInfo;

    return (
      <section id="ProjectHeader">
        <ProgressBar />

        <div className="row row1">
          <div className="project-details col-lg-5 col-md-12 col-sm-12">
            <div className="top-details">
              <h1 className="h1">{name}</h1>
              <div className="type">
                <p className="mono-light">{projectType}</p>
                <p className="mono-light">{squad}</p>
              </div>
              <p>{description}</p>
              <div className="tools">
                <p className="h6">
                  <b>TOOLS :</b>
                </p>
                <ul>
                  {tools.map((oneTool, index) => {
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
                  <a target="_blank" href={projectUrl}>
                    {projectUrl}
                  </a>
                </p>
              </div>
              <div className="likes">
                <p className="h6">
                  <b>LIKES :</b>
                </p>
                <p className="space">{likes}</p>
              </div>
            </div>
            <div className="bottom-details">
              {creators.map((oneInfo, index) => {
                return (
                  <ul key={index} className="creatorInfo">
                    <li>
                      <p className="mono-light">
                        <b>{oneInfo.name}</b>
                      </p>
                      <div className="creator-links">
                        {oneInfo.linkedInUrl ? (
                          <a href={oneInfo.linkedInUrl}>
                            <img
                              src={linkedinLogo}
                              alt="linkedin"
                              className="socialmedias"
                            />
                          </a>
                        ) : null}
                        {oneInfo.linkedInUrl ? (
                          <a href={gitHubUrl}>
                            <img
                              src={githubLogo}
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
            <img src={screenshotUrl} className="big-img" alt={name} />
          </div>
        </div>

        <hr />
        <Switch>
          <Route path="/projects/:projectId" component={ProjectSuggestion} />
        </Switch>

        <ProjectSuggestionThumbnail />
      </section>
    );
  }
}

export default ProjectHeader;
