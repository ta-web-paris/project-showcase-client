import React, { Component } from "react";

import "./style/ProgressBar.scss";

class ProgressBar extends Component {

  render() {

    return (

      <section id="ProgressBar">

        <div className="container">

          <div className="projectlist">

            <div className="oneproject">
              <div className="dot"></div>
            </div>

            <div className="oneproject">
              <div className="dot"></div>
            </div>

            <div className="oneproject active">
              <div className="project-title mono-light btm-title">
                Project 3
              </div>
              <div className="dot"></div>
            </div>

          </div>

          <hr />

        </div>

      </section>

    )

  }

}

export default ProgressBar;
