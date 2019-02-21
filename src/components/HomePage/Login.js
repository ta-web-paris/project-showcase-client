import React from "react";
import api from "../../api.js";

import "./style/Login.scss";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    let myInput = event.target;
    let name = myInput.id;
    this.setState({
      [name]: myInput.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    api
      .post("/login", this.state)
      .then(response => {
        const { userDoc } = response.data;
        this.props.handleLogIn(userDoc);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <section id="Login">

        <h2>Please, log in</h2>

        <form onSubmit={this.handleSubmit} className="container">

        <div className="row">
          <div className="form-group col-lg-6">
          <label htmlFor="email">Email</label>
          <input
            onChange={this.handleChange}
            id="email"
            type="email"
            placeholder="Your email here"
            className="form-control"
          />
          </div>

          <div className="form-group col-lg-6">
          <label htmlFor="password">Password</label>
          <input
            onChange={this.handleChange}
            id="password"
            type="password"
            placeholder="We won't tell"
            className="form-control"
          />
          </div>
          </div>

          <button className="btn btn-primary">Submit</button>
        </form>

      </section>
    );
  }
}

export default Login;
