import React, { Component } from 'react';

import './App.css';
import ExplorerForm from './components/Explorer/Form'
import LoginForm from './components/Cognito/Login/Form'
import BypassVerify from './components/Cognito/Verify/Bypass'
import owl from './owl.png';
import { Authenticator, Greetings, RequireNewPassword, VerifyContact } from "aws-amplify-react";


class App extends Component {
  render() {
    if (this.props.authState === "signedIn") {
      return (
        <div className="App">
          <header className="App-header">
              <img src={owl} className="App-logo" alt="logo" />
              <p />
            <ExplorerForm />
          </header>
        </div>
      );
    } else {
      return <h1>{this.props.authState}</h1>;
    }
  }
}


class AppWithAuth extends React.Component {

  render() {
    const config = {        
        region: 'us-east-1',
        userPoolId: 'us-east-1_ad7bv0cEJ',
        userPoolWebClientId : '31kkeavn30400faua7h2kh08hs'
    };
    return (
      <div>
          <Authenticator hideDefault={true} amplifyConfig={config}>
            <LoginForm />
            <BypassVerify />
            <Greetings />
            <RequireNewPassword />
            <VerifyContact/>
            <App />
          </Authenticator>
      </div>
    );
  }
}


export default AppWithAuth;
