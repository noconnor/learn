import React, { Component } from 'react';

import './App.css';
// import ExplorerForm from './components/Explorer/Form'
import LoginForm from './components/Login/Form'
import owl from './owl.png';

import Amplify from 'aws-amplify';

Amplify.configure({
    Auth: {        
        region: 'us-east-1',
        userPoolId: 'us-east-1_ad7bv0cEJ',
        userPoolWebClientId : '31kkeavn30400faua7h2kh08hs'
    }
});


class App extends Component {
  render() {
    return (
    <div className="App">
      <header className="App-header">
          <img src={owl} className="App-logo" alt="logo" />
          <p/ >
        <LoginForm />
        
      </header>
    </div>
    );
  }
}

export default App;
