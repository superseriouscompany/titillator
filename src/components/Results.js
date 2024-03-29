import React, {Component} from 'react'
import {connect}          from 'react-redux';
import ResultsView        from '../views/ResultsView'
import api                from '../api'

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matchCount: 0
    }
    this.onToken = this.onToken.bind(this)
  }

  componentDidMount() {
    this.props.storeResults(
      this.props.orientation === 'M' ? 'male' : 'female',
      this.props.top.concat(this.props.list),
    )

    api('/matches', {
      method: 'GET',
      accessToken: this.props.accessToken,
    }).then((response) => {
      return response.json()
    }).then((json) => {
      this.setState({
        matchCount: json.count,
        revealed: json.revealed,
        noMatches: !json.count,
      })
    }).catch((err) => {
      if( window.location.href.match(/localhost/) ) {
        alert(err.message || JSON.stringify(err))
      }
      console.error(err)
    })
  }

  render() { return (
    <ResultsView {...this.props}
      stripeKey={window.location.href.match(/localhost/) ? "pk_test_mmQIM1nxdtJu1AymtDN9nBCo" : "pk_live_qNUIQSZrsdKDscelF46J10pD"}
      matchCount={this.state.matchCount - (this.state.revealed || []).length}
      match={this.state.match}
      onToken={this.onToken}
      revealed={this.state.revealed}
      noMatches={this.state.noMatches}/>
  )}

  onToken(token) {
    api('/matches/reveal', {
      method: 'POST',
      accessToken: this.props.accessToken,
      body: { stripe_token: token.id }
    }).then((response) => {
      return response.json()
    }).then((json) => {
      window.location.reload()
    }).catch((err) => {
      if( window.location.href.match(/localhost/) ) {
        alert(err.message || JSON.stringify(err))
      }
      console.error(err)
    })
  }
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

  let top = players.slice(0, 10)

  const otherOrientation = state.profile.orientation === 'M' ? 'female' : 'male'

  return {
    top:             top,
    list:            players.slice(10),
    tiers:           tiers,
    accessToken:     state.profile.accessToken,
    orientation:     state.profile.orientation,
    men:             state.results.male,
    women:           state.results.female,
    hasOtherResults: !!state.results[otherOrientation].length,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showGame: function() {
      dispatch({
        type:  'scene:change',
        scene: 'Game',
      })
    },
    storeResults: function(gender, results) {
      dispatch({
        type:  `results:${gender}`,
        results: results,
      })
    },
    changeOrientation: function(gender) {
      window.ga('send', 'event', 'orientation', 'selected', gender);
      dispatch({type: 'profile:orient', orientation: gender})
      dispatch({type: 'scene:change', scene: 'Game'})
      dispatch({type: 'ladder:reset'})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);
