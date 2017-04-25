import React, {Component} from 'react'
import {connect}          from 'react-redux';
import FilterView       from '../views/FilterView'

const batchSize = 8

class Filter extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.state = {
      batch: 0,
      ids: []
    }
  }

  submit(e) {
    e.preventDefault()
    const checkboxes = Array.prototype.slice.call(document.querySelector('form')['checked[]']);
    const ids = checkboxes.filter((el) => {
      return !!el.checked
    }).map((el) => {
      return el.value
    })

    const combinedIds = this.state.ids.concat(ids)

    if( (this.state.batch + 1) * batchSize > this.props.players.length ) {
      this.props.filter(combinedIds)
      this.props.playGame()
    }

    this.setState({batch: this.state.batch + 1, ids: combinedIds})
    return false
  }

  render() { return (
    <FilterView {...this.props} batch={this.state.batch} batchSize={batchSize} submit={this.submit}/>
  )}
}

function mapStateToProps(state) {
  return {
    players: state.matchup.players.sort((a,b) => {
      return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
    }),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    filter: function(ids) {
      dispatch({type: 'ladder:filter', ids: ids})
    },
    playGame: function() {
      dispatch({type: 'scene:change', scene: 'Game'})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
