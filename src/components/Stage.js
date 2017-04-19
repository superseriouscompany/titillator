import React, {Component} from 'react';
import {connect}          from 'react-redux';
import Octagon            from './Octagon'
import Results            from './Results'
import Login              from './Login'


class Stage extends Component {
  render() { return (
    <div>
      { this.props.scene === 'Login' && false ?
        <Login />
      : this.props.isDone ?
        <Results />
      :
        <div>
          <Octagon />
          <Results />
        </div>
      }
    </div>
  )}
}

function mapStateToProps(state) {
  return {
    isDone: state.matchup.done,
    scene:  state.scene.name,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stage);
