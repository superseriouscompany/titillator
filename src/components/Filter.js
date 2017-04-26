import React, {Component} from 'react'
import {connect}          from 'react-redux';
import FilterView       from '../views/FilterView'

const batchSize = 8

class Filter extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.change = this.change.bind(this)
    this.state = {
      batch: 0,
      ids: []
    }
  }

  change() {
    const checkboxes = Array.prototype.slice.call(document.querySelector('form')['checked[]']);
    const count = checkboxes.filter((el) => {
      return !!el.checked
    }).length

    this.setState({
      count: count
    })
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

    this.setState({batch: this.state.batch + 1, ids: combinedIds, count: 0})
    return false
  }

  render() { return (
    <FilterView {...this.props}
      batch={this.state.batch}
      batchSize={batchSize}
      submit={this.submit}
      change={this.change}
      count={this.state.count}/>
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
