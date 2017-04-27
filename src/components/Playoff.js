import React, {Component} from 'react'
import {connect}          from 'react-redux';
import PlayoffView       from '../views/PlayoffView'

class Playoff extends Component {
  constructor(props) {
    super(props)
    this.change = this.change.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    this.props.setMiddle(this.props.players)
  }

  render() { return (
    <PlayoffView {...this.props} change={this.change} submit={this.submit} />
  )}

  change() {
    console.log('changing')
  }

  submit(e) {
    e.preventDefault()
    const checkboxes = Array.prototype.slice.call(document.querySelector('form')['checked[]']);
    const ids = checkboxes.filter((el) => {
      return !!el.checked
    }).map((el) => {
      return el.value
    })

    this.props.filter(ids)
    this.props.visitGame()
  }
}

function mapStateToProps(state) {
  return {
    players: state.matchup.players.slice(0, 60)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    filter: function(ids) {
      dispatch({type: 'ladder:playoff', ids: ids})
    },
    visitGame: function() {
      dispatch({type: 'scene:change', scene: 'Octagon'})
    },
    setMiddle: function (players) {
      dispatch({type: 'list:middle', middle: players})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playoff);
