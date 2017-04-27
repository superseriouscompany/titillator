import React, { Component } from 'react';
import {connect}            from 'react-redux'
import OctagonView          from '../views/OctagonView'

class Octagon extends Component {
  constructor(props) {
    super(props)
    this.keydown = this.keydown.bind(this)
    this.choose  = this.choose.bind(this)
    this.remove  = this.remove.bind(this)
    this.state   = { showHint: true, winner: null, entering: true }
  }

  keydown(e) {
    if( e.key === 'ArrowLeft' ) {
      this.setState({showHint: false})
      this.choose(this.props.blue.id, this.props.red.id)
    } else if( e.key === 'ArrowRight' ) {
      this.setState({showHint: false})
      this.choose(this.props.red.id, this.props.blue.id)
    }
  }

  componentDidMount() {
    if( !this.props.blue || !this.props.red ) {
      this.props.nextMatchup()
    }
    setTimeout(() => {
      this.setState({entering: false})
    }, 500)
    document.addEventListener('keydown', this.keydown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydown)
  }

  choose(winnerId, loserId) {
    this.setState({winner: winnerId, loser: loserId})
    setTimeout(() => {
      this.props.choose(winnerId, loserId)
      this.props.nextMatchup()
      window.ga('send', 'event', 'comparison', 'made');
      this.setState({winner: null, loser: null, entering: true })

      setTimeout(() => {
        this.setState({entering: false})
      }, 400)
    }, 500);
  }

  remove(id) {
    this.props.remove(id)
    this.props.nextMatchup()
  }

  render() {
    return (
      <OctagonView {...this.props}
        showHint={this.state.showHint}
        choose={this.choose}
        remove={this.remove}
        winner={this.state.winner}
        loser={this.state.loser}
        entering={this.state.entering} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    shuffleLadder: function() {
      dispatch({type: 'ladder:shuffle'})
    },
    nextMatchup: function() {
      dispatch({type: 'matchup:next'})
    },
    remove: function(id) {
      dispatch({
        type: 'ladder:remove',
        id: id
      })
    },
    choose: function(winner, loser) {
      dispatch({
        type: 'matchup:choose',
        winner: winner,
        loser: loser,
      })
    },
  }
}

function mapStateToProps(state) {
  return {
    red:           state.matchup.red,
    blue:          state.matchup.blue,
    round:         state.matchup.round,
    accessToken:   state.profile.accessToken,
    ladder:        state.matchup.players,
    progress:      state.matchup.comparisons / (state.matchup.players.length / 2),
    roundProgress: state.matchup.round / 7,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Octagon);
