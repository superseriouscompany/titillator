import React, {Component} from 'react'
import {connect}          from 'react-redux'
import Login              from './Login'
import Orient             from './Orient'
import Game               from './Game'

class Stage extends Component {
  render() { return (
    <div>
      {  !this.props.authed ?
        <Login />
      : !this.props.oriented ?
        <Orient />
      :
        <Game />
      }
    </div>
  )}
}

function mapStateToProps(state) {
  return {
    scene:    state.scene.name,
    authed:   !!state.profile.accessToken,
    oriented: !!state.profile.orientation,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stage);
