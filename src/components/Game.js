import React, {Component} from 'react'
import {connect}          from 'react-redux'
import Octagon            from './Octagon'
import Results            from './Results'
import Filter             from './Filter'
import api                from '../api'

const finalRound = 3

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.saveScores = this.saveScores.bind(this)
  }

  componentWillMount() {
    if( this.props.players.length ) {
      this.setState({ready: true})
    } else {
      api('/coworkers', {
        method: 'GET',
        accessToken: this.props.accessToken,
      }).then((response) => {
        return response.json()
      }).then((json) => {
        const players = json.users.filter((p) => {
          return p.gender === this.props.orientation
        }).map((p) => {
          p.votes  = 0
          p.wins   = []
          p.losses = []
          return p
        })
        this.props.loadLadder(players)
        this.setState({ready: true})
      }).catch((err) => {
        if( window.location.href.match(/localhost/) ) {
          alert(err.message || JSON.stringify(err))
        }
        console.error(err)
      })
    }
  }

  componentDidMount() {
    if( this.props.round >= finalRound - 2 ) {
      this.props.visitResults()
    }
  }

  componentWillReceiveProps(props) {
    if( props.roundOver && !this.props.roundOver) {
      this.saveScores()
      if( props.round >= finalRound - 2 ) {
        window.ga('send', 'event', 'round', 'completedAll', 'default', props.round);
        this.props.visitResults()
        return
      }

      window.ga('send', 'event', 'round', 'completed', 'default', props.round);
      this.props.advance()
    }
  }

  saveScores() {
    api('/rankings', {
      method: 'POST',
      accessToken: this.props.accessToken,
      body: {
        ladder: this.props.players.map((p) => { return [p.id, p.wins.length, p.losses.length]})
      },
    }).catch((err) => {
      if( window.location.href.match(/localhost/) ) {
        alert(err.message || JSON.stringify(err))
      }
      console.error(err)
    })
  }

  render() { return (
    <div className="fullheight">
      { !this.state.ready ?
        <span>Loading...</span>
      : !this.props.filtered ?
        <Filter />
      : this.props.scene === 'Results' ?
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
    accessToken: state.profile.accessToken,
    filtered:    !!state.matchup.filtered,
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
    },
    visitResults: function() {
      dispatch({type: 'scene:change', scene: 'Results'})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
