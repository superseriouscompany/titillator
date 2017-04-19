import React, { Component } from 'react';
import {connect} from 'react-redux'
import OctagonView from '../views/OctagonView'

class Octagon extends Component {
  constructor(props) {
    super(props)
    this.keydown = this.keydown.bind(this)
    this.choose  = this.choose.bind(this)
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

  render() {
    return (
      <OctagonView {...this.props} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    nextMatchup: function() {
      dispatch({
        type: 'matchup:next'
      })
    },
    choose: function(winner, loser) {
      dispatch({
        type: 'people:choose',
        winner: winner,
        loser: loser,
      })
    },
  }
}

function mapStateToProps(state) {
  return {
    red:   state.people.red,
    blue:  state.people.blue,
    round: state.people.round,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Octagon);
