import React, {Component} from 'react'
import {connect}          from 'react-redux'

class Login extends Component {
  constructor(props) {
    super(props)
    this.getProfileData = this.getProfileData.bind(this)
  }

  componentDidMount() {
    window.IN.Event.on(window.IN, "auth", this.getProfileData)
  }

  getProfileData() {
    window.IN.API.Raw("/people/~").result((deets) => {
      this.props.signin()
      console.log(deets)
    }).error((err) => {
      console.error(err);
      alert(err.message || JSON.stringify(err));
    })
  }

  render() { return (
    <div>
      <div className="header">
        <img className="logo" src="/images/linkedUpLogo.png"/>
        <div className="what-dis">office crushes are bad, mmkay?</div>
      </div>
      <div className="main">
        <img className="arrows" src="/images/arrows.png"/>
        <div>
          <script type="in/Login"></script>
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
    signin: function() {
      dispatch({type: 'profile:linkin', linkedinId: 'nope'})
      dispatch({type: 'scene:change', scene: 'Octagon'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
