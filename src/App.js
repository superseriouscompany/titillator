import React, { Component } from 'react';
import {Provider} from 'react-redux'
import './App.css';
import './Tipsy.css'
import Stage from './components/Stage'
import ResetLink from './components/ResetLink'
import store from './reducers'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="fullheight">
          <Stage />
          <ResetLink />
        </div>
      </Provider>
    );
  }
}

export default App;
