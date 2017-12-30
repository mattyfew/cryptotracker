import React, { Component } from 'react';
import Login from './Login'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CryptoTracker Whatup</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Login />
      </div>
    );
  }
}

export default App;
