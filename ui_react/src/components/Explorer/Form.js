import React, { Component } from 'react';
import {Button, FormGroup, FormControl}  from 'react-bootstrap';
import isURL from 'validator/lib/isURL';


class ExplorerForm extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            url : '' 
        };
    }
    handleChange(e){
        this.setState({
            url : e.target.value
        });
    }
    getValidationState(){
        if (isURL(this.state.url)){
          return 'success';
        }
        return 'error';
    }
    render() {
        const validationState = this.getValidationState();
        const disabled=!isURL(this.state.url);
        return (
            <form>
                <FormGroup
                  controlId="formBasicText"
                  validationState={validationState}
                >
                  <FormControl
                    type="text"
                    value={this.state.url}
                    placeholder="Enter URL"
                    onChange={this.handleChange}
                  />
                  <br />
                  <FormControl.Feedback />
                  <Button bsStyle="primary" disabled={disabled}>Store</Button>
                </FormGroup>
            </form>
        );
    }
}

export default ExplorerForm;
