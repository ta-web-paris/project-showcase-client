import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom"
import api from "../../api"

class EditNotVerified extends Component {
  state = {
    deleted: false
  }


  deleteProject() {
    const { searchId } = this.props.projectInfo
    api
      .delete(`/projects/delete/${searchId}`)
      .then(() => {

        this.setState({ deleted: true });

      })
      .catch(err => {
        console.log(err);
        alert("something went wrong");
      });
  }

  render() {

    if (this.state.deleted) {
      <Redirect to="/" />
    }

    const { searchId, verified } = this.props.projectInfo

    return (<div>
      <Link to={`/projects/edit/${searchId}`}>
        <button className="btn btn-primary">Edit</button>
      </Link>

      {verified ? "" : <button className="btn btn-primary">Verify</button>}

      <button className="btn btn-primary" onClick={(ev) => this.deleteProject(ev)}>Delete</button>
    </div >
    );
  }
}

export default EditNotVerified;