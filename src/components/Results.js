import React, {Component} from 'react'
import {connect}          from 'react-redux';

class Result extends Component {
  render() { return (
    <div>
      Results!
      { this.props.players.map((p, key) => (
        <div key={key}>
          {p.name} ({p.votes})
        </div>
      ))}
    </div>
  )}
}

function mapStateToProps(state) {
  return {
    players: (state.people.players || []).sort((a, b) => {
      return a.votes < b.votes ? 1 : -1
    })
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Result);
