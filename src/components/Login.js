import React from 'react';
import axios from 'axios';

class Login extends React.Component {

    constructor( props ) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (event) => {
        let myInput = event.target;
        let name = myInput.id;
        this.setState({
            [name]: myInput.value
        });
    }

    handleSubmit = (event)=>{
        console.log(this.state);
        event.preventDefault();
        axios.post("http://localhost:3000/api/login", this.state)
        .then((response)=>{
            //console.log(response.data)
                const {userDoc} = response.data;
                this.props.handleLogIn(userDoc);
            }
        )
        .catch(err => console.log(err))
    }

    render() {
        return(
            <form onSubmit={ this.handleSubmit }>
                <label htmlFor="email">Email</label>
                <input onChange={ this.handleChange } id="email" type="email" placeholder="Your email here" />

                <label htmlFor="password">Password</label>
                <input onChange={ this.handleChange } id="password" type="password" placeholder="We won't tell" />

                <button>Submit</button>
            </form>
        )
    }
}

export default Login;