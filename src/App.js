import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux'
import Octagon from './Octagon'
import store from './store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Octagon />
      </Provider>
    );
  }
}

export default App;
