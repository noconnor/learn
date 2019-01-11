import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import aws_exports from './aws-exports';
import globals from './config.json'
import AppWithAuth from './AppWithAuth';
import * as serviceWorker from './serviceWorker';
import Amplify, {Auth} from 'aws-amplify';

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


ReactDOM.render(<AppWithAuth />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
