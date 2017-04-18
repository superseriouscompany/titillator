import React, { Component } from 'react';
import {connect} from 'react-redux'

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
      <div className="octagon">
        <div className="blue corner" onClick={() => this.choose(this.props.blue.id, this.props.red.id)}>
          <img src={this.props.blue.avatar_url} alt={`%{this.props.blue.name} on LinkedIn`} className="face"/>
          {this.props.blue.name}
        </div>
        <div className="red corner" onClick={() =>  this.choose(this.props.red.id, this.props.blue.id)}>
          <img src={this.props.red.avatar_url} alt={`%{this.props.red.name} on LinkedIn`} className="face"/>
          {this.props.red.name}
        </div>
      </div>
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
  if( state.people.players && state.people.players.length ) {
    console.log(state.people.players.map(p => p.name))
  }

  return {
    red:    state.people.red || 'yup',
    blue:   state.people.blue || 'nope',
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Octagon);
