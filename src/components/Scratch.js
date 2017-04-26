'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux';

class Scratch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animating: false
    }
    this.animate = this.animate.bind(this)
  }

  animate() {
    this.setState({animating: true})
    return
  }

  render() { return (

    <div className="heyContainer" onClick={this.animate}>
      <div className={["square", this.state.animating ? "bye" : null].join(' ')}>
      </div>
      <div className={["square", this.state.animating ? "hey" : null].join(' ')}>
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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scratch);
