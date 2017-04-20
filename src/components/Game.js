import React, {Component} from 'react'
import {connect}          from 'react-redux'
import Octagon            from './Octagon'
import Results            from './Results'
import allPlayers         from '../players'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    if( !this.props.players.length ) {
      const players = allPlayers.filter((p) => {
        return p.gender === this.props.orientation
      })
      this.props.loadLadder(players)
    }
  }

  componentWillReceiveProps(props) {
    if( props.roundOver && !this.props.roundOver) {
      if( props.round >= props.players.length - 1 ) {
        window.ga('send', 'event', 'round', 'completedAll', 'default', props.round);
        this.setState({
          done: true,
        })
        return
      }

      window.ga('send', 'event', 'round', 'completed', 'default', props.round);
      this.props.advance()
    }
  }

  render() { return (
    <div className="fullheight">
      { this.props.scene === 'Results' ?
        <Results />
      :
        <div className="fullheight">
          <Octagon />
        </div>
      }
    </div>
  )}
}

function mapStateToProps(state) {
  return {
    roundOver:   !state.matchup.blue || !state.matchup.red,
    round:       state.matchup.round,
    players:     state.matchup.players,
    orientation: state.profile.orientation,
    scene:       state.scene.name,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadLadder: function(players) {
      dispatch({type: 'ladder:load', ladder: players})
      dispatch({type: 'ladder:shuffle'})
    },
    advance: function() {
      dispatch({type: 'round:advance'})
      dispatch({type: 'ladder:shuffle'})
      dispatch({type: 'matchup:next'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
