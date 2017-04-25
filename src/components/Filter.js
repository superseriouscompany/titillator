import React, {Component} from 'react'
import {connect}          from 'react-redux';
import FilterView       from '../views/FilterView'

class Filter extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  submit(e) {
    e.preventDefault()
    const checkboxes = Array.prototype.slice.call(document.querySelector('form')['checked[]']);
    const ids = checkboxes.filter((el) => {
      return !!el.checked
    }).map((el) => {
      return el.value
    })
    console.log(ids)
    return false
  }

  render() { return (
    <FilterView {...this.props} submit={this.submit}/>
  )}
}

function mapStateToProps(state) {
  return {
    players: state.matchup.players,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
