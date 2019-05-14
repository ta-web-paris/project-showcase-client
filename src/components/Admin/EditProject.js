import React, { Component } from "react";
import Joi from "joi-browser";
import api from "../../api.js";
import Input from "../../utils/Input.js";
import Select from "../../utils/Select.js";
import ArrayInput from "../../utils/ArrayInput.js";
import ArrayInputCreators from "../../utils/ArrayInputCreators.js";
import TextAreaInput from "../../utils/TextAreaInput.js";

import "../AddProjectPage/style/AddProject.scss";

class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectInfo: {
        name: "",
        creators: [""],
        screenshotUrl: "",
        description: "",
        gitHubUrl: "",
        projectUrl: "",
        tools: [""],
        projectCredentials: ["", ""],
        display: "web",
        bootcamp: "Web Dev Full Time",
        projectType: "front-end",
        squad: 0,
        feedbackMessage: "",
        errors: {}
      }
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    window.scrollTo(0, 0);

    api.get(`/projects/edit/${id}`)
      .then(res => {
        this.setState({ projectInfo: res.data });
      })
      .catch(err => console.log(err))
  }

  schema = {
    name: Joi.string()
      .trim()
      .required(),
    creators: Joi.array()
      .min(1)
      .items(Joi.string()),
    screenshotUrl: Joi.string()
      .trim()
      .required(),
    description: Joi.string()
      .trim()
      .required()
      .max(150),
    gitHubUrl: Joi.string().uri(),
    projectUrl: Joi.string()
      .trim()
      .uri()
      .required(),
    tools: Joi.array()
      .min(1)
      .items(Joi.string()),
    projectCredentials: Joi.array(),
    display: Joi.string().valid("web", "mobile"),
    bootcamp: Joi.string().valid(
      "Web Dev Full Time",
      "Web Dev Part Time",
      "UX/UI Part Time",
      "UX/UI Full Time",
      "Data Analytics"
    ),

    projectType: Joi.string().valid(
      "fullstack",
      "fullstack - framework",
      "front-end",
      "UX",
      "UI",
      "UX/UI",
      "data"
    ),

    squad: Joi.number()
      .integer()
      .positive(),
  };

  validateInput() {
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
      bootcamp,
      projectType,
      squadNumber,
      squadMonth,
      squadYear
    } = this.state;
    const result = Joi.validate(
      {
        name,
        creators,
        screenshotUrl,
        description,
        gitHubUrl,
        projectUrl,
        display,
        tools,
        projectCredentials,
        bootcamp,
        projectType,
        squadNumber,
        squadMonth,
        squadYear
      },
      this.schema,
      { abortEarly: false }
    );

    const errors = {};
    if (result.error) {
      result.error.details.map(oneItem => {
        return (errors[oneItem.path[0]] = oneItem.message);
      });
      return errors;
    }
    return null;
  }

  handleUserInput = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleArrayInput = idx => event => {
    const { value, name } = event.target;
    const stateCopy = [...this.state[name]];
    stateCopy[idx] = value;
    this.setState({ [name]: stateCopy });
  };

  handleCreatorsInput = (idx, key) => event => {
    const { value } = event.target;
    this.setState(state => {
      const creators = [...state.creators];
      creators[idx] = creators[idx] || {};
      creators[idx][key] = value;

      return { creators };
    });
  };

  addField = field => {
    this.setState({
      [field]: this.state[field].concat([""])
    });
  };

  formatSquadString(formField) {
    const { squadNumber, squadMonth, squadYear } = formField;
    return `#${squadNumber} - ${squadMonth} ${squadYear}`;
  }

  submitProjectForm = event => {
    event.preventDefault();

    const errors = this.validateInput();
    this.setState({ errors });
    if (errors) {
      return;
    }

    const newProject = { ...this.state };
    newProject.squad = this.formatSquadString(newProject);

    // /projects/edit/:id
    api
      .put(`/projects/edit`, newProject)
      .then(() => {
        this.setState({
          ...this.getInitialState(),
          feedbackMessage: "Thank You! Your project was properly saved."
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          feedbackMessage:
            "Sorry, something went wrong... Your information were not submitted."
        });
      });
  };

  updateFile = event => {
    const { files } = event.target;

    console.log("New FILE\n", files[0]);

    if (!files[0]) {
      this.setState({
        screenshotUrl:
          "https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/4017/s300/logo-ironhack-blue.png"
      });
      return;
    }

    const uploadForm = new FormData();
    uploadForm.append("imageFile", files[0]);

    api
      .post("/upload-image", uploadForm)
      .then(response => {
        console.log("File UPLOADED", response.data);
        const { imageUrl } = response.data;
        this.setState({ screenshotUrl: imageUrl });
      })
      .catch(err => {
        console.log(err);
        alert("Sorry, there was an error.");
      });
  };

  render() {
    console.log(this.state.projectInfo);

    const {
      name,
      creators,
      description,
      gitHubUrl,
      projectUrl,
      display,
      tools,
      projectCredentials,
      screenshotUrl,
      bootcamp,
      projectType,
      squad,
      feedbackMessage,
      errors
    } = this.state.projectInfo;

    const credPlaceholder = ["Username", "Password"];
    const displays = ["mobile", "web"];

    const bootcamps = [
      "Web Dev Full Time",
      "Web Dev Part Time",
      "UX/UI Part Time",
      "UX/UI Full Time",
      "Data Analytics"
    ];

    const projectTypes = [
      "fullstack",
      "fullstack - framework",
      "front-end",
      "UX",
      "UI",
      "UX/UI",
      "data"
    ];
    return (
      <section id="EditProject" className="ProjectForm">
        <h2>Edit a project</h2>


        <form className="addProject" onSubmit={this.submitProjectForm}>
          {feedbackMessage && <p>{feedbackMessage}</p>}
          <div className="container">
            <div className="row justify-content-center">
              <div className="form-group col-lg-4">
                <Input
                  name="name"
                  onChange={this.handleUserInput}
                  value={name}
                  label="Project name "
                />
                {errors && errors.name && <p>{errors.name}</p>}
              </div>
              <div className="form-group col-lg-4">
                <ArrayInputCreators
                  label="Creators "
                  fieldArray={creators}
                  name="creators"
                  onChange={this.handleCreatorsInput}
                  onClick={() => this.addField("creators")}
                />
                {errors && errors.creators && <p>{errors.creators}</p>}
              </div>
              <div className="form-group col-lg-4">
                <Input
                  type="file"
                  name="screenshotUrl"
                  onChange={this.updateFile}
                  label="Picture "
                />
                {errors && errors.screenshotUrl && (
                  <p>{errors.screenshotUrl}</p>
                )}
              </div>
              {/* {screenshotUrl && <img src={screenshotUrl} alt={name} />} */}
              <div className="form-group col-lg-12">
                <TextAreaInput
                  name="description"
                  onChange={this.handleUserInput}
                  value={description}
                  label="Description "
                />
                {errors && errors.description && <p>{errors.description}</p>}
              </div>
              <div className="form-group col-lg-4">
                <Input
                  name="gitHubUrl"
                  onChange={this.handleUserInput}
                  value={gitHubUrl}
                  label="GitHub Repository URL "
                />
                {errors && errors.gitHubUrl && <p>{errors.gitHubUrl}</p>}
              </div>
              <div className="form-group col-lg-4">
                <Input
                  name="projectUrl"
                  onChange={this.handleUserInput}
                  value={projectUrl}
                  label="Project URL "
                />
                {errors && errors.projectUrl && <p>{errors.projectUrl}</p>}
              </div>
              <div className="form-group col-lg-4">
                <Select
                  label="Display "
                  name="display"
                  onChange={this.handleUserInput}
                  value={display}
                  optionsArray={displays}
                />
                {errors && errors.display && <p>{errors.display}</p>}
              </div>
              <div className="form-group col-lg-12">
                <ArrayInput
                  label="Tools "
                  fieldArray={tools}
                  name="tools"
                  onChange={idx => this.handleArrayInput(idx)}
                  onClick={() => this.addField("tools")}
                />
                {errors && errors.tools && <p>{errors.tools}</p>}
              </div>
              <div className="form-group col-lg-6">
                <Select
                  label="Bootcamp "
                  name="bootcamp"
                  onChange={this.handleUserInput}
                  value={bootcamp}
                  optionsArray={bootcamps}
                />
                {errors && errors.bootcamp && <p>{errors.bootcamp}</p>}
              </div>
              <div className="form-group col-lg-6">
                <Select
                  label="Project type "
                  name="projectType"
                  onChange={this.handleUserInput}
                  value={projectType}
                  optionsArray={projectTypes}
                />
                {errors && errors.projectType && <p>{errors.projectType}</p>}
              </div>
              <fieldset className="form-group col-lg-12">
                <h4>Squad :</h4>
                <div className="row">
                  <div className="form-group col-lg-4">
                    <Input
                      type="number"
                      placeholder="128"
                      name="squadNumber"
                      value={squad}
                      onChange={this.handleUserInput}
                      label="Squad number "
                    />
                    {errors && errors.squadNumber && (
                      <p>{errors.squadNumber}</p>
                    )}
                  </div>
                  <div className="form-group col-lg-4">

                    {errors && errors.squadMonth && <p>{errors.squadMonth}</p>}
                  </div>
                  <div className="form-group col-lg-4">

                  </div>
                </div>
              </fieldset>
              <fieldset className="form-group col-lg-12">
                <h4>
                  Optional: provide credentials in order for recruters to be
                  able to enter your website
                </h4>
                <div className="row">
                  {projectCredentials.map((oneCred, idx) => (
                    <div className="form-group col-lg-6" key={idx}>
                      <Input
                        name="projectCredentials"
                        onChange={this.handleArrayInput(idx)}
                        value={oneCred}
                        label={credPlaceholder[idx]}
                      />
                    </div>
                  ))}
                </div>
                {errors && errors.projectCredentials && (
                  <p>{errors.projectCredentials}</p>
                )}
              </fieldset>
              <button className="btn btn-primary submit-btn">Submit</button>
            </div>
          </div>
        </form>

      </section>
    );
  }
}

export default EditProject;
