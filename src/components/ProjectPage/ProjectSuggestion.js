import React, { Component } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import api from "../../api"
import "./style/ProjectSuggestion.scss";
import { Link } from "@reach/router";

class ProjectSuggestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectInfo: [
        {
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
      ]
    };
  }

  componentDidMount() {
    const { params } = this.props.match;

    api
      .get(`/creator-projects/${params.projectId}`, {
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

    return (
      <section id="ProjectSuggestion">
        <h2 className="h2">Projects from</h2>

        <div className="container">
          <div className="row blog">
            <div className="col-md-12">
              <div
                id="blogCarousel"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="row row3">
                      {this.state.projectInfo.map(el => (
                        <div key={el.name} className="col-lg-3 col-md-6">
                          <a href={el.searchId}>
                            <img src={el.screenshotUrl} alt="screenshot url" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* <div className="carousel-item">
                    <div className="row row3">
                      <div className="col-lg-3 col-md-6">
                        <a href="0">
                          <img
                            src="http://placehold.it/250x250"
                            alt="placehold"
                          />
                        </a>
                      </div>
                      <div className="col-lg-3 col-md-6">
                        <a href="0">
                          <img
                            src="http://placehold.it/250x250"
                            alt="placehold"
                          />
                        </a>
                      </div>
                      <div className="col-lg-3 col-md-6">
                        <a href="0">
                          <img
                            src="http://placehold.it/250x250"
                            alt="placehold"
                          />
                        </a>
                      </div>
                      <div className="col-lg-3 col-md-6">
                        <a href="0">
                          <img
                            src="http://placehold.it/250x250"
                            alt="placehold"
                          />
                        </a>
                      </div>
                    </div>
                  </div> */}
                </div>
                {/* <ol className="carousel-indicators">
                  <li
                    data-target="#blogCarousel"
                    data-slide-to="0"
                    className="active indic"
                  />
                  <li
                    data-target="#blogCarousel"
                    data-slide-to="1"
                    className="indic"
                  />
                </ol> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ProjectSuggestion;
