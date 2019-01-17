import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import './style/ProjectsList.scss';

function getProjectUrl(oneProject){
    return `/projects/${oneProject._id}`;
}

class ProjectsList extends Component {

    constructor(props){
        super(props);
        this.state = {
            projects: [],
        }
    }

  componentDidMount(){
    window.scrollTo(0,0)
    axios.get('http://localhost:4000/api/projects', { withCredentials: true })
      .then(response =>{
          this.setState({projects : response.data})
      })
      .catch(err=>{
          console.log("Listing Info Error", err);
          alert("Sorry something went wrong")
      })
    }

render(){
    const { projects } = this.state;

    return(
        <section id="ProjectsList">
            <ul className="row no-gutters">
                {projects.map(oneProject => {
                    return (
                        <li key={oneProject._id} className="col-lg-4 col-md-6 col-sm-12">
                        <div className="li-content">
                          <Link to ={getProjectUrl(oneProject)}>
                                <img src={oneProject.screenshotUrl} alt="project img" className="image"/>
                            <div className="content">
                                <div className="top-content">
                                    <p><b>{oneProject.name}</b></p>
                                </div>
                                <div className="bottom-content">
                                    <h6>{oneProject.projectType}</h6>
                                    {oneProject.creators.length > 1 ?
                                    <h6>Group project</h6>
                                    :
                                    oneProject.creators.map((oneCreator, index) => {
                                        return <li key={index}><h6>{oneCreator.name}</h6></li>
                                    })
                                    }
                                </div>
                            </div>
                          </Link>
                        </div>
                        </li>
                    );
                })}
            </ul>

        </section>
    )
}
}

export default ProjectsList;