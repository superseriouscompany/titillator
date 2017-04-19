import React, {Component} from 'react'
import {connect}          from 'react-redux'

class Orient extends Component {
  render() { return (
    <div className="orientContainer">
      <div className="orientDesc">choose your journey</div>
      <button className="orientButton men" onClick={() => this.props.orient('M')}>Male Coworkers</button>
      <button className="orientButton women" onClick={() => this.props.orient('F')}>Female Coworkers</button>
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
