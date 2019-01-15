import React, { Component } from "react";
import axios from "axios";

import "./style/HeaderProject.scss";

class ProjectHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      creators : [],
      tools : [],
      projectCredentials : [],
    };
  }

  componentDidMount(){
    const { params } = this.props.match;
    // retrieve the info from the API as soon as the component loads
    axios.get(`http://localhost:4000/api/projects/${params.projectId}`, { withCredentials: true })
        .then(response => {
            console.log("Project Details", response.data)
            this.setState(response.data)
        })
        .catch(err => {
            console.log("Project Details ERROR", err);
            alert("Sorry! Something went wrong.");
        })
  }

  render() {

    const { name, creators, screenshotUrl, description, gitHubUrl, projectUrl, projectType, tools, likes, projectCredentials, display, bootcamp, squad } = this.state;

    return (
    
      <section id="ProjectHeader">

      <div className="row">

        <div className="project-details col-lg-5 col-md-12 col-sm-12">
          <div className="top-details">
            <h1 class="h1">{name}</h1>
            <div className="type">
              <p className="mono-medium">{projectType}</p>
              <p className="mono-medium">{squad}</p>
            </div>
            <p>{description}</p>
            <div className="tools">
              <p className="h6"><b>TOOLS :</b></p>
              <ul>
                {tools.map((oneTool, index) => {
                  return <li key={index}><p className="space">{oneTool}</p></li>
                })}
              </ul>
            </div>
            <div className="link">
              <p className="h6"><b>PROJECT :</b></p>
              <p className="space"><a href="projecturl">{projectUrl}</a></p>
            </div>
          </div>
          <div className="bottom-details">
            {creators.map((oneInfo, index) => {
              return (
              <ul className="creatorInfo">
                {oneInfo.linkedInUrl ?
                  <li key={index}>
                    <p><b>{oneInfo.name}</b></p>
                    <div className="creator-links">
                      <p className="space"><a href={oneInfo.linkedInUrl}>LinkedIn</a></p>
                      <p className="space"><a href={gitHubUrl}>Github</a></p>
                    </div>
                </li>
                  :
                  null
                }
              </ul>
              )
            })}
          </div>
        </div>

            <div className="project-image col-lg-7 col-md-12 col-sm-12">
              <img src={screenshotUrl} className="big-img" alt={name} />
            </div>  

          </div>
      </section>
  
      )

  }

}

export default ProjectHeader;
