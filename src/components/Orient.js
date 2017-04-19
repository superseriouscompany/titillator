import React, {Component} from 'react'
import {connect}          from 'react-redux'

class Orient extends Component {
  render() { return (
    <div>
      <button onClick={() => this.props.orient('M')}>Men at Tinder</button>
      <button onClick={() => this.props.orient('F')}>Women at Tinder</button>
    </div>
  )}
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    orient: function(gender) {
      window.ga('send', 'event', 'orientation', 'selected', gender);
      dispatch({type: 'profile:orient', orientation: gender})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orient);
