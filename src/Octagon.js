import React, { Component } from 'react';
import {connect} from 'react-redux'

class Octagon extends Component {
  choose(winner, loser) {
    console.log(winner, loser)
  }

  render() {
    return (
      <div className="octagon">
        <div className="blue corner" onClick={() => this.choose(0, 1)}>
          <img src="https://placehold.it/420x420" alt="Neil Sarkar on LinkedIn" />
          Neil Sarkar
        </div>
        <div className="red corner" onClick={() =>  this.choose(1, 0)}>
          <img src="https://placehold.it/420x420" alt="Santi Garza on LinkedIn" />
          Santi Garza
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    people: state.people
  }
}

export default connect(mapStateToProps)(Octagon);
