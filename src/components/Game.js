import React, {Component} from 'react'
import {connect}          from 'react-redux'
import Octagon            from './Octagon'
import Results            from './Results'

class Game extends Component {
  componentWillMount() {
    this.props.loadLadder(this.props.players)
  }

  componentWillReceiveProps(props) {
    if( props.roundOver ) { alert('Next round!'); }
  }

  render() { return (
    <div>
      { this.props.isDone ?
        <Results />
      :
        <div>
          <Octagon />
          <Results />
        </div>
      }
    </div>
  )}
}

function mapStateToProps(state) {
  return {
    roundOver: !state.matchup.blue || !state.matchup.red,
    players:   state.matchup.players.filter((p) => {
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
