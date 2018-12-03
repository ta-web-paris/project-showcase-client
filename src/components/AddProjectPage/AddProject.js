import    React, { Component }    from     "react";
import    Joi                     from     "joi-browser";
import    api                     from     "../../api.js";
import    Input                   from     "./Input.js";
import    Select                  from     "./Select.js";
import    ArrayInput              from     "./ArrayInput.js";

//NEED: 
//-handle linkedin question
//-extract file upload function to other file ?
//-tokens to be sent to students ?
//-propTypes

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
      squadYear: "2011",
      feedbackMessage: "",
      errors: {}
    };
  }

  schema = {
    name: Joi.string().trim().required(),
    creators: Joi.array().min(1).items(Joi.string()),
    screenshotUrl: Joi.string().trim().required(),
    description: Joi.string().trim().required().max(150),
    gitHubUrl: Joi.string().uri(),
    projectUrl: Joi.string().trim().uri().required(),
    tools: Joi.array().min(1).items(Joi.string()),
    projectCredentials: Joi.array(),
    display: Joi.string().valid('web', 'mobile'),
    bootcamp: Joi.string().valid("Web Dev Full Time", "Web Dev Part Time", "UX/UI Part Time", "UX/UI Full Time", "Data Analytics"),
    squadNumber: Joi.number().integer().positive(),
    squadMonth: Joi.string().valid("January","February","March","April","May","June","July","August","September","October","November","December"),
    squadYear: Joi.string().valid('2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'),
  };

  validateInput() {
    const result = Joi.validate(this.state, this.schema, { abortEarly: false });
    console.log(result);

    const errors = {};
    result.error.details.map(oneItem => {
      return (errors[oneItem.path[0]] = oneItem.message);
    });
    return errors;
  }

  handleUserInput = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }
  
  handleArrayInput = (idx) => (event) => {
    const {value, name} = event.target;
    const stateCopy = [...this.state[name]];
    stateCopy[idx] = value;
    this.setState({ [name]: stateCopy });
  }
  
  addField = (field) => {
    this.setState({
      [field]: this.state[field].concat([''])
    });
  }

  formatSquadString(formField){
    const {squadNumber, squadMonth, squadYear} = formField;
    return `#${squadNumber} - ${squadMonth} ${squadYear}`
  }

  submitProjectForm = (event) => {
    event.preventDefault();

    const errors = this.validateInput();
    this.setState({ errors });
    if (errors) {
      return;
    }

    const newProject = {...this.state};
    newProject.squad = this.formatSquadString(newProject);

    api.post(`/projects`, newProject)
      .then(() => {
        this.setState({
          ...this.getInitialState(), 
          feedbackMessage: "Thank You! Your project was properly saved."
        })
      })
      .catch(err => {
        console.error(err);
        this.setState({
          feedbackMessage: "Sorry, something went wrong... Your information were not submitted."
        })
      });
  }

  updateFile = (event) => {
    const { files } = event.target;

    console.log('New FILE\n', files[0]);

    if (!files[0]) {
      this.setState({ screenshotUrl: "https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/4017/s300/logo-ironhack-blue.png" });
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
      screenshotUrl, 
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
      feedbackMessage,
      errors
    } = this.state;

    const credPlaceholder = ["Username", "Password"]
    const displays = ["mobile", "web"]
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const years = ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']
    const bootcamps = ["Web Dev Full Time", "Web Dev Part Time", "UX/UI Part Time", "UX/UI Full Time", "Data Analytics" ]
   
    return (
      <form onSubmit={this.submitProjectForm}>

        {feedbackMessage && <p>{feedbackMessage}</p>}

        <Input 
          name="name"
          onChange={this.handleUserInput}
          value={name} 
          label="Project name"
          />
        {errors.name && <p>{errors.name}</p>}

        <ArrayInput 
          label="Creators" 
          fieldArray={creators} 
          name="creators" 
          onChange={idx => this.handleArrayInput(idx)} 
          onClick={() => this.addField("creators")} 
        />
        {errors.creators && <p>{errors.creators}</p>}

        <Input 
          type="file" 
          name="screenshotUrl" 
          onChange={this.updateFile} 
          label="Screenshot URL" 
        />
        {errors.screenshotUrl && <p>{errors.screenshotUrl}</p>}

        {/* {screenshotUrl && <img src={screenshotUrl} alt={name} />} */}
        
        <Input
          name="description"
          onChange={this.handleUserInput}
          value={description}
          label="Description"
        />
        {errors.description && <p>{errors.description}</p>}
      
        <Input
          name="gitHubUrl"
          onChange={this.handleUserInput}
          value={gitHubUrl}
          label="GitHub Repository URL"
        />
        {errors.gitHubUrl && <p>{errors.gitHubUrl}</p>}

        <Input
          name="projectUrl"
          onChange={this.handleUserInput}
          value={projectUrl}
          label="Project URL"
        />
        {errors.projectUrl && <p>{errors.projectUrl}</p>}
      
        <Select 
          label="Display" 
          name="display" 
          onChange={this.handleUserInput} 
          value={display} 
          optionsArray={displays}
        />
        {errors.display && <p>{errors.display}</p>}

        <ArrayInput 
          label="Tools" 
          fieldArray={tools}  
          name="tools" 
          onChange={idx => this.handleArrayInput(idx)} 
          onClick={() => this.addField("tools")} 
        />
        {errors.tools && <p>{errors.tools}</p>}

           
        <fieldset>
          <legend>Optional: provide credentials in order for recruters to be able to enter your website</legend>

          {projectCredentials.map((oneCred, idx) => (
            <Input
              name="projectCredentials"
              onChange={this.handleArrayInput(idx)}
              value={oneCred}
              label={credPlaceholder[idx]}
            />
          ))}
          {errors.projectCredentials && <p>{errors.projectCredentials}</p>}

        </fieldset>        
  
        <Select 
          label="Bootcamp" 
          name="bootcamp" 
          onChange={this.handleUserInput} 
          value={bootcamp} 
          optionsArray={bootcamps}
        />
        {errors.bootcamp && <p>{errors.bootcamp}</p>}


        <fieldset>
          <legend>Squad :</legend>

            <Input
              type="number"
              placeholder="128"
              name="squadNumber"
              value={squadNumber}
              onChange={this.handleUserInput}
              label="Squad Number"
            />
            {errors.squadNumber && <p>{errors.squadNumber}</p>}
        
            <Select 
              label="Squad Month" 
              name="squadMonth" 
              onChange={this.handleUserInput} 
              value={squadMonth} 
              optionsArray={months}
            />
            {errors.squadMonth && <p>{errors.squadMonth}</p>}


            <Select
              label="Squad Year" 
              name="squadYear" 
              onChange={this.handleUserInput} 
              value={squadYear} 
              optionsArray={years}
            />
            {errors.squadYear && <p>{errors.squadYear}</p>}


        </fieldset>  

        <button>Submit</button>
      </form>
    );
  }
}

export default AddProject;
