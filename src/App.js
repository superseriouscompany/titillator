import React, { Component } from 'react';
import './App.css';
import store from './store'

class App extends Component {
  rate() {
    store.dispatch({
      type: 'cool'
    })
  }

  render() {
    return (
      <a onClick={this.rate}>Rate Bish</a>
    );
  }
}

export default App;
