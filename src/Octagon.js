import React, { Component } from 'react';
import {connect} from 'react-redux'

class Octagon extends Component {
  render() {
    return (
      <div className="octagon">
        <div className="blue corner" onClick={() => this.props.choose(this.props.blue.id, this.props.red.id)}>
          <img src="https://placehold.it/420x420" alt="Neil Sarkar on LinkedIn" />
          {this.props.blue.name}
        </div>
        <div className="red corner" onClick={() =>  this.props.choose(this.props.red.id, this.props.blue.id)}>
          <img src="https://placehold.it/420x420" alt="Santi Garza on LinkedIn" />
          {this.props.red.name}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    choose: function(winner, loser) {
      dispatch({
        type: 'people:choose',
        winner: winner,
        loser: loser,
      })
    }
  }
}

function mapStateToProps(state) {
  return {
    red:    state.people.red || 'nope',
    blue:   state.people.blue || 'nope',
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Octagon);
