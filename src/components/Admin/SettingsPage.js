import React, { Component } from "react";

import "../style/SettingsPage.scss";
import api from "../../api.js";

class SettingsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
      email: "",
      avatar: "",
      originalAvatar: "",
      stateLoaded: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.currentUser || state.stateLoaded) {
      return null;
    }

    const { fullName, email, avatar } = props.currentUser;
    return {
      fullName,
      email,
      avatar,
      originalAvatar: avatar,
      stateLoaded: true
    };
  }

  updateFile = event => {
    const { files } = event.target;

    console.log("New FILE\n", files[0]);

    if (!files[0]) {
      const { originalAvatar } = this.state;
      this.setState({ avatar: originalAvatar });
      return;
    }

    const uploadForm = new FormData();
    uploadForm.append("imageFile", files[0]);

    api
      .post("/upload-image", uploadForm)
      .then(response => {
        console.log("File UPLOADED", response.data);
        const { imageUrl } = response.data;
        this.setState({ avatar: imageUrl });
      })
      .catch(err => {
        console.log(err);
        alert("Sorry, there was an error.");
      });
  };

  updateText = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    const { fullName, email, avatar } = this.state;
    return (
      <section id="SettingsPage">
        <h2>User Settings</h2>

        <form onSubmit={this.handleSubmit} className="container">
          <div className="row">
            <fieldset className="form-group col-lg-6">
              <label htmlFor="fullName">Full Name :</label>
              <input
                id="fullName"
                className="form-control"
                type="text"
                value={fullName}
                onChange={this.updateText}
              />
            </fieldset>

            <fieldset className="form-group col-lg-6">
              <label htmlFor="email">Email :</label>
              <input
                id="email"
                type="email"
                className="form-control"
                value={email}
                onChange={this.updateText}
              />
            </fieldset>

            <fieldset className="form-group col-lg-12">
              <label htmlFor="avatar">Avatar :</label>
              <input
                id="avatar"
                type="file"
                className="form-control"
                onChange={this.updateFile}
              />
            </fieldset>

            {avatar && <img src={avatar} alt={fullName} />}
          </div>
          <button className="btn btn-primary">Save Changes</button>
        </form>
      </section>
    );
  }
}

export default SettingsPage;
