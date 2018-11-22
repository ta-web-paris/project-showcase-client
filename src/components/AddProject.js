import React, { Component } from "react";
import PropTypes from "prop-types";


class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      creators: [''],
      screenshotUrl: "",
      description: "",
      gitHubUrl: "",
      projectUrl: "",
      tools: [''],
      linkedInUrl: "",
      projectCredentials: ['', ''],
      display: "",
      bootcamp: "",
      squad: ""
    };
  }

  handleUserInput(event) {
    const { value, name } = event.target;

    this.setState({
      [name]: value
    });
  }

  handleAddCreator = () => {
    this.setState({
      creators: this.state.creators.concat([''])
    });
  }

  handleAddTools = () => {
    this.setState({
      tools: this.state.tools.concat([''])
    });
  }

  handleCredentialsInput = (idx) => (event) => {
    const {value}= event.target;
    const credentialsCopy = {...this.state.projectCredentials};
    credentialsCopy[idx]= value;
    this.setState({
      projectCredentials: credentialsCopy
    });
  }

  handleAddTools = () => {
    this.setState({
      tools: this.state.tools.concat([''])
    });
  }

  handleCreatorInput = (idx) => (event) => {
    const {value} = event.target;
    const {creators} = this.state;
    const creatorsCopy = [...creators];
    creatorsCopy[idx]=value;
    this.setState({ creators: creatorsCopy });
  }

  handleToolInput = (idx) => (event) => {
    const {value} = event.target;
    const {tools} = this.state;
    const toolsCopy = [...tools];
    toolsCopy[idx]=value;
    this.setState({ tools: toolsCopy });
  }

  submitProjectForm(event) {
    event.preventDefault();

    const newProject = this.state;
    this.props.AddProject(newProject);
    this.setState({
      name: "",
      creators: [''],
      screenshotUrl: "",
      description: "",
      gitHubUrl: "",
      projectUrl: "",
      tools: [''],
      linkedInUrl: "",
      projectCredentials: ['', ''],
      display: "",
      bootcamp: "",
      squad: ""
    });
  }

  render() {
    const { name, creators, screenshotUrl, description, gitHubUrl, projectUrl, display, tools, projectCredentials } = this.state;
    const credPlaceholder = ["username", "password"]
    // const { submitProjectForm } = this.props;
    return (
      //form[onSubmit]>(label+input)*6

      <form onSubmit={event => this.submitProjectForm(event)}>
        <label htmlFor="name">Project name:</label>
        <input
          type="text"
          name="name"
          onChange={event => this.handleUserInput(event)}
          value={name}
        />

        {creators.map((oneCreator, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Creator #${idx + 1} name`}
              value={oneCreator}
              onChange={this.handleCreatorInput(idx)}
            />))}
        <button type="button" onClick={this.handleAddCreator}>Add a creator</button>
       
        <label htmlFor="screenshotUrl">Screenshot URL:</label>
        <input
          type="text"
          name="screenshotUrl"
          onChange={event => this.handleUserInput(event)}
          value={screenshotUrl}
        />
      

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          name="description"
          onChange={event => this.handleUserInput(event)}
          value={description}
        />
      
        <label htmlFor="gitHubUrl">GitHub Repository URL:</label>
        <input
          type="text"
          name="gitHubUrl"
          onChange={event => this.handleUserInput(event)}
          value={gitHubUrl}
        />
      
        <label htmlFor="projectUrl">Project URL:</label>
        <input
          type="text"
          name="projectUrl"
          onChange={event => this.handleUserInput(event)}
          value={projectUrl}
        />
      
        <label htmlFor="display">Display:</label>
        <select id="display" onChange={event => this.handleUserInput(event)} value={display}>
          <option value="mobile">Mobile</option> 
          <option value="web" defaultValue>Web</option>
        </select>
              
        
        {tools.map((oneTool, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`React ? Express ?`}
              value={oneTool}
             onChange={this.handleToolInput(idx)}
            />))}
        <button type="button" onClick={this.handleAddTools}>Add a tool</button>

           
        <fieldset>
          <legend>Optional: provide credentials in order for recruters to be able to enter your website</legend>

           {projectCredentials.map((oneCred, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={credPlaceholder[idx]}
              value={oneCred}
              onChange={this.handleCredentialsInput(idx)}
            />))}
        </fieldset>        
    

        <button>Submit</button>
      </form>
    );
  }
}

AddProject.propTypes = {
  AddProject: PropTypes.func
};

export default AddProject;
