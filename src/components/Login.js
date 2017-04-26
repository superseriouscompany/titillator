import React, {Component} from 'react'
import {connect}          from 'react-redux'
import api                from '../api'
import LimIsSoAwesomeItsUnbelievable from '../../images/LimIsSoAwesomeItsUnbelievable.png'
import Intro2             from '../../images/Intro2.png'
import Intro3             from '/images/Intro3.png'

class Login extends Component {
  constructor(props) {
    super(props)
    this.getProfileData = this.getProfileData.bind(this)
    this.next           = this.next.bind(this)
    this.state = {
      step: 0,
      prompts: [
        LimIsSoAwesomeItsUnbelievable,
        Intro2,
        Intro3,
        "images/Intro4.png",
      ]
    }
  }

  componentDidMount() {
    window.IN.Event.on(window.IN, "auth", this.getProfileData)
  }

  getProfileData() {
    window.IN.API.Raw("/people/~:(id,picture-url,picture-urls::(original),positions,public-profile-url,email-address,headline,specialties,first-name,last-name)").result((user) => {
      api('/users', {
        method: 'POST',
        body: user,
      }).then((response) => {
        return response.json()
      }).then((json) => {
        this.props.signin(json.access_token)
      }).catch((err) => {
        console.error(err)
        alert(err.message || JSON.stringify(err))
      })
    }).error((err) => {
      console.error(err);
      alert(err.message || JSON.stringify(err));
    })
  }

  next() {
    return this.setState({step: this.state.step + 1})
  }

  render() { return (
    <div className="fullheight">
      { this.state.step < this.state.prompts.length ?
        <div className="intro fullheight" onClick={this.next}>
            <img className="introImg" src={this.state.prompts[this.state.step]} alt="Message"/>
        </div>
      : null }

      <div style={{display: this.state.step === this.state.prompts.length ? 'block' : 'none'}}>
        <div className="header">
          <img className="logo" src="images/linkedUpLogo.png" alt="Logo"/>
        </div>
        <div className="main">
          <img className="arrows" src="images/arrows.png" alt="Arrows"/>
          <div>
            <script type="in/Login"></script>
          </div>
        </div>
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
    signin: function(accessToken) {
      dispatch({type: 'profile:linkin', accessToken: accessToken})
      dispatch({type: 'scene:change', scene: 'Game'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
