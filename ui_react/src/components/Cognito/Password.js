import React from 'react';
import {Button, FormGroup, FormControl}  from 'react-bootstrap';
import { AuthPiece } from "aws-amplify-react";
import Auth from '@aws-amplify/auth';

class RequireNewPassword extends AuthPiece {
    constructor(props){
        super(props);
        this._validAuthStates = ["requireNewPassword"];
        this.updatePassword = this.updatePassword.bind(this);
        this.state = { loading : false };
    }
    updatePassword(){
        const user = this.props.authData;
        const { password } = this.inputs;
        const { requiredAttributes } = user.challengeParam;
        const attrs = this.objectWithProperties(this.inputs, requiredAttributes);

        Auth.completeNewPassword(user, password, attrs)
            .then(user => this.changeState('signedIn', user))
            .catch(err => this.error(err));
    }
    showComponent(theme){
        const user = this.props.authData;
        const { requiredAttributes } = user.challengeParam;
        return (<div className="App">
                <header className="App-header">
                <h5>Please create a new password</h5>
                <p />
                <form>
                    <FormGroup controlId="password"> 
                    {requiredAttributes
                        .map(attribute => (
                            <FormGroup controlId={attribute}> 
                            <FormControl
                                placeholder={this.convertToPlaceholder(attribute)}
                                theme={theme}
                                key={attribute}
                                name={attribute}
                                type="text"
                                onChange={this.handleInputChange}
                            />
                            </FormGroup>
                        ))}
                      <FormControl
                        type="password"
                        id="password"
                        key="password"
                        name="password"
                        placeholder="new password"
                        onChange={this.handleInputChange}
                      />
                      <FormControl.Feedback />
                    </FormGroup>
                    <Button bsStyle="primary" 
                        disabled={this.state.loading}
                        onClick={() => this.updatePassword()}>{this.state.loading ? 'One Second..' : 'Update'}
                    </Button>
                </form>
                </header>
                </div>);
    }
    convertToPlaceholder(str) {
        return str.split('_').map(part => part.charAt(0).toUpperCase() + part.substr(1).toLowerCase()).join(' ');
    }
    objectWithProperties(obj, keys) {
        const target = {};
        for (const key in obj) {
            if (keys.indexOf(key) === -1) {
                continue;
            }
            if (!Object.prototype.hasOwnProperty.call(obj, key)) {
                continue;
            }
            target[key] = obj[key];
        }
        return target;
    }
}

export default RequireNewPassword;