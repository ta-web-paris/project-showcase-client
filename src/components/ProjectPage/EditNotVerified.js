import React, { Component } from 'react';
import { Link } from "react-router-dom"
class EditNotVerified extends Component {
  state = {}
  render() {
    console.log(this.props);

    const { searchId } = this.props

    return (<div>
      <Link to={`/projects/edit/${searchId}`}>
        <button className="btn btn-primary">Edit</button>
      </Link>

    </div >
    );
  }
}

export default EditNotVerified;