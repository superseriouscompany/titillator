import React, {Component} from 'react'
import {connect}          from 'react-redux'
import Octagon            from './Octagon'
import Results            from './Results'

class Game extends Component {
  render() { return (
    <div>
      { this.props.isDone ?
        <Results />
      :
        <Octagon />
      }
    </div>
  )}
}

function mapStateToProps(state) {
  return {
    isDone: state.matchup.done,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
