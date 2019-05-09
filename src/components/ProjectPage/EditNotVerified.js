import React, { Component } from 'react';
import { Link } from "react-router-dom"
class EditNotVerified extends Component {
  state = {}
  render() {
    const { searchId, verified } = this.props.projectInfo

    return (<div>
      <Link to={`/projects/edit/${searchId}`}>
        <button className="btn btn-primary">Edit</button>
      </Link>

      {verified ? "" : <button className="btn btn-primary">Verify</button>}

      <button className="btn btn-primary">Delete</button>
    </div >
    );
  }
}

export default EditNotVerified;