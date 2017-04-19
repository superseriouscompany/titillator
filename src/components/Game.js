import React, {Component} from 'react'
import {connect}          from 'react-redux'
import Octagon            from './Octagon'
import Results            from './Results'

class Game extends Component {
  componentDidMount() {
    this.props.loadLadder(this.props.players)
  }

  render() { return (
    <div>
      { this.props.isDone ?
        <Results />
      :
        <Octagon />
      }
    </div>
  )}
}

function mapStateToProps(state) {
  return {
    isDone:  state.matchup.done,
    players: state.matchup.players.filter((p) => {
      return p.gender === state.profile.orientation
    }),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadLadder: function(players) {
      dispatch({type: 'ladder:load', ladder: players})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
