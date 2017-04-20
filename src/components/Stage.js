import React, {Component} from 'react'
import {connect}          from 'react-redux'
import Login              from './Login'
import Orient             from './Orient'
import Game               from './Game'

class Stage extends Component {
  render() {
    if( !this.props.authed )
      return <Login />
    if( !this.props.oriented || this.props.scene === 'Orient' )
      return <Orient />
    return <Game />
  }
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
