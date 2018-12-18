import React, { Component } from 'react';
import {Button, FormGroup, FormControl}  from 'react-bootstrap';
import isEmpty from 'validator/lib/isEmpty';

import Auth from '@aws-amplify/auth';

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.isLoginDisabled = this.isLoginDisabled.bind(this);
        this.state = {
            username:'',
            password:''
        };
        this.login = this.login.bind(this);
    }
    handleUsernameChange(event){
        this.setState({username:event.target.value});
    }
    handlePasswordChange(event){
        this.setState({password:event.target.value});
    }
    isEmpty(field){
        return isEmpty(field, {ignore_whitespace:true}) ? 'error' : 'success';
    }
    isLoginDisabled(){
       const opts = {ignore_whitespace:true};
       return isEmpty(this.state.username, opts) || isEmpty(this.state.password, opts);
    }
    login(){
        Auth.signIn(this.state.username, this.state.password)
            .then(success => console.log('successful sign in'))
            .catch(err => console.log(err));
    }
    render(){
        const disabled=this.isLoginDisabled();
        return (
            <form>
                <FormGroup
                  controlId="username"
                  validationState={this.isEmpty(this.state.username)}
                >
                  <FormControl
                    type="text"
                    value={this.state.username}
                    placeholder="username"
                    onChange={this.handleUsernameChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                
                <FormGroup
                  controlId="password"
                  validationState={this.isEmpty(this.state.password)}
                > 
                  <FormControl
                    type="password"
                    value={this.state.password}
                    placeholder="password"
                    onChange={this.handlePasswordChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <Button bsStyle="primary" disabled={disabled} onClick={!disabled ? this.login : null}>Login</Button>
            </form>
        );
    }
}

export default LoginForm;