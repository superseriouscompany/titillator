import React, { Component } from 'react';
import './App.css';
import {createStore} from 'redux';

function rankings(state = {}, action) {
  switch(action.type) {
    case 'cool':
      console.log('nice')
      return state;
    default:
      return state;
  }
}

const store = createStore(rankings)

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
