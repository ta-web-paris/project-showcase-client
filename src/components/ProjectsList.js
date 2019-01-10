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
            <ul className="col-lg-12">
                {projects.map(oneProject => {
                    return (
                        <li key={oneProject._id} className="col-lg-4 col-md-6 col-sm-12">
                          <div className="content mx-1">
                            <Link to ={getProjectUrl(oneProject)}>
                                <h1>{oneProject.name}</h1>
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