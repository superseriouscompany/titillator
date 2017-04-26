import React, {Component} from 'react'
import {connect}          from 'react-redux';

class ResetLink extends Component {
  reset() {
    window.localStorage.clear()
    window.location.reload()
  }

  render() { return (
    <a onClick={this.reset}>
      Reset
    </a>
  )}
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetLink);
