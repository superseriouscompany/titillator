import React, {Component} from 'react'
import {connect}          from 'react-redux';

class ResetLink extends Component {
  reset() {
    window.localStorage.clear()
    window.location.reload()
  }

  render() { return (
    <a style={{position: 'absolute', right: 0, top: 0, backgroundColor: 'rgba(0,0,0,0.5)', color: 'white',}} onClick={this.reset}>
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
