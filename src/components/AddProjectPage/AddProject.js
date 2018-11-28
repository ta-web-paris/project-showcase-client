import React, { Component } from "react";
import api from "../../api.js";

//NEED: 
//-feedback messages
//-create separate components
//-handle linkedin question
//-improve file upload function

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
      squadMonth: "January",
      squadYear: "2011"
    };
  }

  handleUserInput = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  addField = (field) => {
    this.setState({
      [field]: this.state[field].concat([''])
    });
  }

  handleArrayInput = (idx) => (event) => {
    const {value, name} = event.target;
    const stateCopy = [...this.state[name]];
    stateCopy[idx] = value;
    this.setState({ [name]: stateCopy });
  }


  formatSquadString(formField){
    const {squadNumber, squadMonth, squadYear} = formField;
    return `#${squadNumber} - ${squadMonth} ${squadYear}`
  }

  submitProjectForm = (event) => {
    event.preventDefault();

    const newProject = {...this.state};
    newProject.squad = this.formatSquadString(newProject);

    api.post(`/projects`, newProject)
      .then(() => this.setState(this.getInitialState()))
      .catch(err => {
        console.error(err);
        alert("Sorry! Something went wrong. 💩");
      });
  }

  updateFile = (event) => {
    const { files } = event.target;

    console.log('New FILE\n', files[0]);

    if (!files[0]) {
      return;
    }

    const uploadForm = new FormData();
    uploadForm.append('imageFile', files[0]);

    api.post('/upload-image', uploadForm)
      .then(response => {
        console.log('File UPLOADED', response.data);
        const { imageUrl } = response.data;
        this.setState({ screenshotUrl: imageUrl });
      })
      .catch(err => {
        console.log(err);
        alert('Sorry, there was an error.');
      });
  }


  render() {
    const { 
      name, 
      creators, 
      description, 
      gitHubUrl, 
      projectUrl,
      display, 
      tools, 
      projectCredentials,
      bootcamp,
      squadNumber,
      squadMonth,
      squadYear,
    } = this.state;

    const credPlaceholder = ["Username", "Password"]
    const months = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
    const years = ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']
    const bootcamps = ["Web Dev Full Time", "Web Dev Part Time", "UX/UI Part Time", "UX/UI Full Time", "Data Analytics" ]
   
    return (
      <form onSubmit={this.submitProjectForm}>
        <label htmlFor="name">Project name:</label>
        <input
          type="text"
          name="name"
          onChange={this.handleUserInput}
          value={name}
        />

        <label>Creators: </label>
        {creators.map((oneCreator, idx) => (
          <input
            key={idx}
            type="text"
            name="creators"
            placeholder={`Creator #${idx + 1} name`}
            value={oneCreator}
            onChange={this.handleArrayInput(idx)}
          />))}
        <button type="button" onClick={() => this.addField("creators")}>Add a creator</button>
       
        <label htmlFor="screenshotUrl">Screenshot URL:</label>
        <input id="screenshotUrl" name="screenshotUrl" type="file" onChange={this.updateFile} />
      
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          name="description"
          onChange={this.handleUserInput}
          value={description}
        />
      
        <label htmlFor="gitHubUrl">GitHub Repository URL:</label>
        <input
          type="text"
          name="gitHubUrl"
          onChange={this.handleUserInput}
          value={gitHubUrl}
        />
      
        <label htmlFor="projectUrl">Project URL:</label>
        <input
          type="text"
          name="projectUrl"
          onChange={this.handleUserInput}
          value={projectUrl}
        />
      
        <label htmlFor="display">Display:</label>
        <select id="display" name="display" onChange={this.handleUserInput} value={display}>
          <option value="mobile">Mobile</option> 
          <option value="web">Web</option>
        </select>
              
        <label>Tools: </label>
        {tools.map((oneTool, idx) => (
          <input
            key={idx}
            type="text"
            name="tools"
            placeholder={`React ? Express ?`}
            value={oneTool}
            onChange={this.handleArrayInput(idx)}
          />))}
        <button type="button" onClick={() => this.addField("tools")}>Add a tool</button>

           
        <fieldset>
          <legend>Optional: provide credentials in order for recruters to be able to enter your website</legend>

           {projectCredentials.map((oneCred, idx) => (
            <label key={idx}>{credPlaceholder[idx]}: 
            <input
              key={idx}
              type="text"
              name="projectCredentials"
              placeholder={credPlaceholder[idx]}
              value={oneCred}
              onChange={this.handleArrayInput(idx)}
            />
            </label>
            ))}
        </fieldset>        
    
        <label htmlFor="bootcamp">Bootcamp:</label>
        <select id="bootcamp" name="bootcamp" onChange={this.handleUserInput} value={bootcamp}>
          {bootcamps.map((oneBootcamp, idx)=> <option key={idx} value={oneBootcamp}>{oneBootcamp}</option> )}
        </select>

        <fieldset>
          <legend>Squad :</legend>

            <label>Squad Number: 
              <input
                type="number"
                placeholder="128"
                name="squadNumber"
                value={squadNumber}
                onChange={this.handleUserInput}
              />
            </label>

            <label>Squad Month: 
              <select name="squadMonth" onChange={this.handleUserInput} value={squadMonth}>
                {months.map((oneMonth, idx)=> <option key={idx} value={oneMonth}>{oneMonth}</option> )}
              </select>
            </label>

            <label>Squad Year: 
              <select name="squadYear" onChange={this.handleUserInput} value={squadYear}>
                {years.map((oneYear, idx)=> <option key={idx} value={oneYear}>{oneYear}</option> )}
              </select>
            </label>
        </fieldset>  

        <button>Submit</button>
      </form>
    );
  }
}

export default AddProject;
