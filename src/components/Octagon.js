import React, { Component } from 'react';
import {connect}            from 'react-redux'
import OctagonView          from '../views/OctagonView'
import api                  from '../api'

class Octagon extends Component {
  constructor(props) {
    super(props)
    this.keydown    = this.keydown.bind(this)
    this.choose     = this.choose.bind(this)
    this.remove     = this.remove.bind(this)
    this.saveScores = this.saveScores.bind(this)
  }

  keydown(e) {
    // TODO: make it work cross browser
    if( e.key === 'ArrowLeft' ) {
      document.getElementsByClassName('arrowHint')[0].style.display = 'none';
      document.getElementsByClassName('kanye')[0].style.display = 'block';
      this.choose(this.props.blue.id, this.props.red.id)
    } else if( e.key === 'ArrowRight' ) {
      document.getElementsByClassName('arrowHint')[0].style.display = 'none';
      document.getElementsByClassName('kanye')[0].style.display = 'block';
      this.choose(this.props.red.id, this.props.blue.id)
    }
  }

  componentDidMount() {
    this.props.shuffleLadder()
    this.props.nextMatchup()
    document.addEventListener('keydown', this.keydown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydown)
  }

  choose(winnerId, loserId) {
    this.props.choose(winnerId, loserId)
    this.props.nextMatchup()
    window.ga('send', 'event', 'comparison', 'made');
  }

  saveScores() {
    api('/rankings', {
      method: 'POST',
      accessToken: this.props.accessToken,
      body: {
        ladder: this.props.ladder.map((p) => { return [p.id, p.wins.length, p.losses.length]})
      },
    }).then(() => {
      alert('Saved!')
    }).catch((err) => {
      alert(err.message || JSON.stringify(err))
    })
  }

  remove(id) {
    this.props.remove(id)
    this.props.nextMatchup()
  }

  render() {
    return (
      <OctagonView {...this.props}
        choose={this.choose}
        remove={this.remove}
        saveScores={this.saveScores} />
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
    red:         state.matchup.red,
    blue:        state.matchup.blue,
    round:       state.matchup.round,
    accessToken: state.profile.accessToken,
    ladder:      state.matchup.players,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Octagon);
