import React, { Component } from 'react';

import 'App.css';
import ExplorerForm from 'components/Explorer/Form'
import Menu from 'components/Explorer/Greetings'
import LoginForm from 'components/Cognito/SignIn'
import RequireNewPassword from 'components/Cognito/Password'
import owl from 'owl.png';
import { Authenticator } from "aws-amplify-react";


class App extends Component {
  render() {
    if (this.props.authState === "signedIn") {
      console.log("Rendering app...");
      return (
        <div className="App">
          <Menu {...this.props} />
          <header className="App-header">
              <img src={owl} className="App-logo" alt="logo" />
              <p />
              <ExplorerForm />
          </header>
        </div>
      );
    } else {
      return null;
    }
  }
}


class AppWithAuth extends React.Component {

  render() {
    const config = {        
        region: 'us-east-2',
        userPoolId: 'us-east-2_MVctqFLBX',
        userPoolWebClientId : '6us22uqpnfa45q639bdkklg0a0'
    };
    return (
      <div>
        <Authenticator hideDefault={true} amplifyConfig={config}>
          <LoginForm />
          <RequireNewPassword />
          <App />
        </Authenticator>
      </div>
    );
  }
}

export default AppWithAuth;
