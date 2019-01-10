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

      <div className="container col-lg-12">

        <div className="project-details col-lg-4 col-md-6 col-sm-12">
          <h1>{name}</h1>
          <h6>{projectType}</h6>
          <h6>{squad}</h6>
          <h5>{description}</h5>
          <h5>TOOLS :</h5>
          <ul>
            {tools.map((oneTool, index) => {
              return <li key={index}><h5>{oneTool}</h5></li>
            })}
          </ul>
          <h5>PROJECT :</h5>
          <h5>{projectUrl}</h5>
          <h5>Github : {gitHubUrl}</h5>
            {creators.map((oneInfo, index) => {
              return (
              <div className="creatorInfo">
                <h5 key={index}>{oneInfo.name}</h5>
                {oneInfo.linkedInUrl ?
                  <h5>{oneInfo.linkedInUrl}</h5>
                  :
                  null
                }
              </div>
              )
            })}
            </div>

            <div className="project-image col-lg-8 col-md-6 col-sm-12">
              <img src={screenshotUrl} class="big-img" alt={name} />
            </div>  

          </div>
      </section>
  
      )

  }

}

export default ProjectHeader;
