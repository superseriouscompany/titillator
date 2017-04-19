import React, {Component} from 'react'
import {connect}          from 'react-redux'
import Octagon            from './Octagon'
import Results            from './Results'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.props.loadLadder(this.props.players)
  }

  componentWillReceiveProps(props) {
    if( props.roundOver && !this.props.roundOver) {
      if( props.round >= props.players.length - 1 ) {
        this.setState({
          done: true,
        })
        return
      }
      this.props.advance()
    }
  }

  render() { return (
    <div>
      { this.state.done ?
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
    round:     state.matchup.round,
    players:   state.matchup.players.filter((p) => {
      return p.gender === state.profile.orientation
    }),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadLadder: function(players) {
      dispatch({type: 'ladder:load', ladder: players})
    },
    advance: function() {
      dispatch({type: 'round:advance'})
      dispatch({type: 'ladder:shuffle'})
      dispatch({type: 'matchup:next'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
