import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "./style/ProjectSuggestion.scss";

class ProjectSuggestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    $("#blogCarousel").carousel({
      interval: 3000
    });

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
    // const { projects } = this.state;
    // const {
    //   name,
    //   creators,
    //   screenshotUrl,
    //   description,
    //   gitHubUrl,
    //   projectUrl,
    //   projectType,
    //   tools,
    //   likes,
    //   projectCredentials,
    //   display,
    //   bootcamp,
    //   squad
    // } = this.props;

    return (
      <section id="ProjectSuggestion">
        <h2 className="h2">Projects from X</h2>

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
                  </div>

                  <div className="carousel-item">
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
                  </div>
                </div>
                <ol className="carousel-indicators">
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
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ProjectSuggestion;
