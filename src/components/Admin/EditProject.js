import React, { Component } from "react";
import axios from "axios";

class EditProject extends Component {
  state = {};

  componentDidMount() {
    const { params } = this.props.match;
    console.log(params.id);
    axios
      .get(`http://localhost:4000/api/projects/edit/${params.id}`, {
        withCredentials: true
      })
      .then(response => {
        console.log(response);
        this.setState({ verifed: response.data });
      })
      .catch(err => {
        console.log("Listing Info Error", err);
        alert("Sorry something went wrong");
      });
  }
  render() {
    return <h3>Here we will edit projects</h3>;
  }
}

export default EditProject;
