import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import api from "../api.js";

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState(){
    return {
      name: "",
      creators: [''],
      screenshotUrl: "",
      description: "",
      gitHubUrl: "",
      projectUrl: "",
      tools: [''],
      linkedInUrl: "",
      projectCredentials: ['', ''],
      display: "web",
      bootcamp: "Web Dev Full Time",
      squadNumber: 0,
      squadMonth: "",
      squadYear: "",
      isSubmitSuccess: false,
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

  handleCredentialsInput = (idx) => (event) => {
    const {value}= event.target;
    const credentialsCopy = [...this.state.projectCredentials];
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

  formatSquadString(formField){
    const {squadNumber, squadMonth, squadYear} = formField;
    return `#${squadNumber} - ${squadMonth} ${squadYear}`
  }

  submitProjectForm(event) {
    event.preventDefault();

    const newProject = {...this.state};
    newProject.squad = this.formatSquadString(newProject);

    api.post(`/projects`, newProject)
      .then(response => {
        console.log("POST add project", response.data);
        this.setState(this.getInitialState());
      })
      .catch(err => {
        console.error(err);
        alert("Sorry! Something went wrong. 💩");
      });
    
  }

  render() {
    const { 
      name, 
      creators, 
      screenshotUrl, 
      description, 
      gitHubUrl, 
      projectUrl,
      display, 
      tools, 
      projectCredentials,
      isSubmitSuccess,
      bootcamp,
      squadNumber,
      squadMonth,
      squadYear,
    } = this.state;

    const credPlaceholder = ["Username", "Password"]
    const months = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
    const years = ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']

    if (isSubmitSuccess) {
      return <Redirect to={`/`} />
    }
    return (
      <form onSubmit={event => this.submitProjectForm(event)}>
        <label htmlFor="name">Project name:</label>
        <input
          type="text"
          name="name"
          onChange={event => this.handleUserInput(event)}
          value={name}
        />

        <label>Creators: </label>
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
        <select id="display" name="display" onChange={event => this.handleUserInput(event)} value={display}>
          <option value="mobile">Mobile</option> 
          <option value="web">Web</option>
        </select>
              
        <label>Tools: </label>
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
            <label key={idx}>{credPlaceholder[idx]}: 
            <input
              key={idx}
              type="text"
              placeholder={credPlaceholder[idx]}
              value={oneCred}
              onChange={this.handleCredentialsInput(idx)}
            />
            </label>
            ))}
        </fieldset>        
    
        <label htmlFor="bootcamp">Bootcamp:</label>
        <select id="bootcamp" name="bootcamp" onChange={event => this.handleUserInput(event)} value={bootcamp}>
          <option value="Web Dev Full Time">Web Dev Full Time</option> 
          <option value="Web Dev Part Time">Web Dev Part Time</option>
          <option value="UX/UI Full Time">UX/UI Full Time</option>
          <option value="UX/UI Part Time">UX/UI Part Time</option> 
          <option value="Data Analytics">Data Analytics</option>
        </select>

        <fieldset>
          <legend>Squad :</legend>

            <label>Squad Number: 
              <input
                type="number"
                placeholder="128"
                name="squadNumber"
                value={squadNumber}
                onChange={event => this.handleUserInput(event)}
              />
            </label>

            <label>Squad Month: 
              <select name="squadMonth" onChange={event => this.handleUserInput(event)} value={squadMonth}>
                {months.map((oneMonth, idx)=> <option key={idx} value={oneMonth}>{oneMonth}</option> )}
              </select>
            </label>

            <label>Squad Year: 
              <select name="squadYear" onChange={event => this.handleUserInput(event)} value={squadYear}>
                {years.map((oneYear, idx)=> <option key={idx} value={oneYear}>{oneYear}</option> )}
              </select>
            </label>
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
