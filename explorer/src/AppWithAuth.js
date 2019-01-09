import React from 'react';
import LoginForm from 'components/Cognito/SignIn'
import RequireNewPassword from 'components/Cognito/Password'
import { Authenticator } from "aws-amplify-react";
import Amplify, {Auth} from 'aws-amplify';
import App from './App';
import aws_exports from './aws-exports';
import globals from './config.json'

import 'App.css';

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
                endpoint: globals.urls_endpoint,
                custom_header: async () => { 
                  // https://aws-amplify.github.io/docs/js/api#custom-request-headers
                  return { Authorization: (await Auth.currentSession()).idToken.jwtToken };
                }
            }
        ]
    }
});


class AppWithAuth extends React.Component {

  render() {
    return (
        <Authenticator hideDefault={true}>
          <LoginForm />
          <RequireNewPassword />
          <App />
        </Authenticator>
    );
  }
}

export default AppWithAuth;
