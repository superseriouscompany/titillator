import React, { Component } from 'react';
import {connect} from 'react-redux'

class Octagon extends Component {
  render() {
    return (
      <div className="octagon">
        <div className="blue corner" onClick={() => this.props.choose(this.props.blue.id, this.props.red.id)}>
          <img src={this.props.blue.avatar_url} alt={`%{this.props.blue.name} on LinkedIn`} className="face"/>
          {this.props.blue.name}
        </div>
        <div className="red corner" onClick={() =>  this.props.choose(this.props.red.id, this.props.blue.id)}>
          <img src={this.props.red.avatar_url} alt={`%{this.props.red.name} on LinkedIn`} className="face"/>
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
    red:    state.people.red || 'yup',
    blue:   state.people.blue || 'nope',
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Octagon);
