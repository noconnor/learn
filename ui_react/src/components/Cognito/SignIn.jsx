import React from 'react';
import {Button, FormGroup, FormControl}  from 'react-bootstrap';
import { SignIn } from "aws-amplify-react";
import 'App.css';
import owl from 'owl.png';
import Auth from '@aws-amplify/auth';
// import isEmpty from 'validator/lib/isEmpty';

// https://dev.to/kylegalbraith/how-to-easily-customize-the-aws-amplify-authentication-ui-42pl
class LoginForm extends SignIn {
    constructor(props, context){
        super(props, context);
        this._validAuthStates = ["signIn", "signedOut"];
        this.signIn = this.signIn.bind(this);
        this.state = { loading: false };
    }
    async signIn(){
        const { username, password } = this.inputs;
        this.setState({loading: true});
        try {
            const user = await Auth.signIn(username, password);
            if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                this.changeState('requireNewPassword', user);
            } else {
                this.changeState('signedIn', user);
            }
        } catch (err) {
            this.error(err);
        } finally {
            this.setState({loading: false})
        }
    }
    showComponent(theme){
        console.log("Rendering signIn");
        return (
            <div className="App">
                <header className="App-header">
                <img src={owl} className="App-logo" alt="logo" />
                <p />
                <form>
                    <FormGroup controlId="username">
                        <FormControl
                            type="text"
                            id="username"
                            key="username"
                            name="username"
                            placeholder="username"
                            onChange={this.handleInputChange}
                        />
                    <FormControl.Feedback />
                    </FormGroup>
                
                    <FormGroup controlId="password"> 
                      <FormControl
                        type="password"
                        id="password"
                        key="password"
                        name="password"
                        placeholder="password"
                        onChange={this.handleInputChange}
                      />
                      <FormControl.Feedback />
                    </FormGroup>
                    <Button bsStyle="primary" 
                        disabled={this.state.loading}
                        onClick={() => this.signIn()}>{this.state.loading ? 'One Sec..' : 'Login'}</Button>
                </form>
                </header>
            </div>
        );
    }
}

export default LoginForm;