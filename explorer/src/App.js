import React, { Component } from 'react';

import 'App.css';
import ExplorerForm from 'components/Explorer/Form'
import Menu from 'components/Explorer/Greetings'
import owl from 'owl.png';

class App extends Component {
  render() {
    if (this.props.authState === "signedIn") {
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

export default App;