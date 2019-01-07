import React, { Component } from 'react';
import {Button, FormGroup, FormControl}  from 'react-bootstrap';
import isURL from 'validator/lib/isURL';
import API from '@aws-amplify/api';

class ExplorerForm extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.state = {
            url : '', loading: false 
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
    submit(){
        this.setState({loading:true})
        API
        .post("urls", "/urls", {})
        .then(response =>{
            console.log(response);
            this.setState({loading:false})  
        })
        .catch(error => {
            this.setState({loading:false})  
            console.log(error);
        });
        console.log("Test");
    }
    render() {
        const validationState = this.getValidationState();
        const disabled=!isURL(this.state.url) || this.state.loading;
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
                  <Button bsStyle="primary" disabled={disabled} onClick={this.submit}>Store</Button>
                </FormGroup>
            </form>
        );
    }
}

export default ExplorerForm;
