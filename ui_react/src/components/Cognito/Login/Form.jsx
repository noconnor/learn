import React from 'react';
import {Button, FormGroup, FormControl}  from 'react-bootstrap';
import { SignIn } from "aws-amplify-react";
import '../../../App.css';
import owl from '../../../owl.png';
// import isEmpty from 'validator/lib/isEmpty';

class LoginForm extends SignIn {
    constructor(props){
        super(props);
        this._validAuthStates = ["signIn", "signedOut"];
    }
    showComponent(theme){
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
                    <Button bsStyle="primary" onClick={() => super.signIn()}>Login</Button>
                </form>
                </header>
            </div>
        );
    }
}

export default LoginForm;