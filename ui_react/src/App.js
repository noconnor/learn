import React, { Component } from 'react';

import './App.css';
import ExplorerForm from './components/Explorer/Form'
import owl from './owl.png';

class App extends Component {
  render() {
    return (
    <div className="App">
      <header className="App-header">
          <img src={owl} className="App-logo" alt="logo" />
          <p/ >
        <ExplorerForm />
        
      </header>
    </div>
    );
  }
}

export default App;
