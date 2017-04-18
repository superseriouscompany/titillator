import React, {Component} from 'react';
import {connect}          from 'react-redux';
import Octagon            from './Octagon'
import Results            from './Results'

class Stage extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'nope'})
  }

  render() { return (
    <div>
      { this.props.isDone ?
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
    isDone: state.people.done,
    x:      state.halp,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stage);
