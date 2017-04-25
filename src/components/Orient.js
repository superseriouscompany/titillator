import React, {Component} from 'react'
import {connect}          from 'react-redux'

class Orient extends Component {
  render() { return (
    <div className="orientContainer fullheight">
      <div className="orientDesc">who do you want to play with first?</div>
      <div className="orientButtons">
        <button className="orientButton men" onClick={() => this.props.orient('M')}>🍆</button>
        <button className="orientButton women" onClick={() => this.props.orient('F')}>🍑</button>
      </div>
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
      dispatch({type: 'scene:change', scene: 'Game'})
      dispatch({type: 'ladder:reset'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orient);
