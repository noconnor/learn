import React from 'react';
import LoginForm from 'components/Cognito/SignIn'
import RequireNewPassword from 'components/Cognito/Password'
import { Authenticator } from "aws-amplify-react";
import App from './App';

import 'App.css';

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
