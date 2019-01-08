import React, { Component } from 'react';

import 'App.css';
import ExplorerForm from 'components/Explorer/Form'
import Menu from 'components/Explorer/Greetings'
import LoginForm from 'components/Cognito/SignIn'
import RequireNewPassword from 'components/Cognito/Password'
import owl from 'owl.png';
import { Authenticator } from "aws-amplify-react";
import Amplify, {Auth} from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure({

    Auth: {
        identityPoolId: aws_exports.aws_cognito_identity_pool_id,
        region: aws_exports.aws_cognito_region, 
        userPoolId: aws_exports.aws_user_pools_id, 
        userPoolWebClientId: aws_exports.aws_user_pools_web_client_id,
        mandatorySignIn: false,
    },
    API: {
        endpoints: [
            {
                name: "urls",
                endpoint: "https://p38hu3uxw0.execute-api.eu-west-1.amazonaws.com/prod",
                custom_header: async () => { 
                  // https://aws-amplify.github.io/docs/js/api#custom-request-headers
                  return { Authorization: (await Auth.currentSession()).idToken.jwtToken };
                }
            }
        ]
    }
});



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
              <ExplorerForm {...this.props}/>
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
    return (
      <div>
        <Authenticator hideDefault={true}>
          <LoginForm />
          <RequireNewPassword />
          <App />
        </Authenticator>
      </div>
    );
  }
}

export default AppWithAuth;
