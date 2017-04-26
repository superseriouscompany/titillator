import React, {Component} from 'react'
import {connect}          from 'react-redux';
import ResultsView        from '../views/ResultsView'
import api                from '../api'

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    api('/matches', {
      method: 'GET',
      accessToken: this.props.accessToken,
    }).then((response) => {
      return response.json()
    }).then((json) => {
      this.setState({
        matchCount: json.count
      })
    }).catch((err) => {
      if( window.location.href.match(/localhost/) ) {
        alert(err.message || JSON.stringify(err))
      }
      console.error(err)
    })
  }

  render() { return (
    <ResultsView {...this.props} matchCount={this.state.matchCount}/>
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
    tiers:       tiers,
    accessToken: state.profile.accessToken,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showGame: function() {
      dispatch({
        type:  'scene:change',
        scene: 'Game',
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);
