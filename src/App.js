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
      <div className="octagon">
        <div className="blue corner">
          <img src="https://placehold.it/420x420" alt="Neil Sarkar's LinkedIn Profile Picture"/>
          Neil Sarkar
        </div>
        <div className="red corner">
          <img src="https://placehold.it/420x420" alt="Santi Garza's LinkedIn Profile Picture"/>
          Santi Garza
        </div>
      </div>
    );
  }
}

export default App;
