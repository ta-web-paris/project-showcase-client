import React, { Component } from "react";

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
      <section>
        <h2>User Settings</h2>

        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <label htmlFor="fullName">Full Name:</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={this.updateText}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={this.updateText}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="avatar">Avatar:</label>
            <input id="avatar" type="file" onChange={this.updateFile} />
          </fieldset>

          {avatar && <img src={avatar} alt={fullName} />}

          <button>Save Changes</button>
        </form>
      </section>
    );
  }
}

export default SettingsPage;
