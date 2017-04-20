import React, {Component} from 'react'
import {connect}          from 'react-redux';
import ResultsView        from '../views/ResultsView'

class Result extends Component {
  render() { return (
    <ResultsView {...this.props} />
  )}
}

function mapStateToProps(state) {
  const players = [].concat(state.matchup.players).sort((a, b) => {
    return a.votes < b.votes ? 1 : -1
  })

  let tiers = [[]]
  let currentTier = players[0].votes
  players.forEach((p) => {
    if( p.votes < currentTier ) {
      tiers.push([])
      currentTier = p.votes
    }
    tiers[tiers.length-1].push(p)
  })

  return {
    tiers: tiers,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showGame: function() {
      console.log('trying to show game')
      dispatch({
        type:  'scene:change',
        scene: 'Octagon',
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Result);
