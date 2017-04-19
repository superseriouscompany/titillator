import React, { Component } from 'react';
import {connect} from 'react-redux'
import OctagonView from '../views/OctagonView'

class Octagon extends Component {
  constructor(props) {
    super(props)
    this.keydown = this.keydown.bind(this)
    this.choose  = this.choose.bind(this)
    this.remove  = this.remove.bind(this)
  }

  keydown(e) {
    // TODO: make it work cross browser
    if( e.key === 'ArrowLeft' ) {
      this.choose(this.props.blue.id, this.props.red.id)
    } else if( e.key === 'ArrowRight' ) {
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
  }

  remove(id) {
    this.props.remove(id)
    this.props.nextMatchup()
  }

  render() {
    return (
      <OctagonView {...this.props} choose={this.choose} remove={this.remove}/>
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
    red:   state.matchup.red,
    blue:  state.matchup.blue,
    round: state.matchup.round,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Octagon);
