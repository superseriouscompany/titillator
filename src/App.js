import React, { Component } from 'react';
import {Provider} from 'react-redux'
import './App.css';
import Stage from './components/Stage'
import store from './reducers'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Stage />
        </div>
      </Provider>
    );
  }
}

export default App;
