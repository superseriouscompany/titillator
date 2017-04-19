import React, {Component} from 'react'
import {connect}          from 'react-redux'
import api                from '../api'

class Login extends Component {
  constructor(props) {
    super(props)
    this.getProfileData = this.getProfileData.bind(this)
  }

  componentDidMount() {
    window.IN.Event.on(window.IN, "auth", this.getProfileData)
  }

  getProfileData() {
    window.IN.API.Raw("/people/~:(id,picture-url,positions,public-profile-url,email-address)").result((user) => {
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

  render() { return (
    <div>
      <script type="in/Login"></script>
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
      dispatch({type: 'scene:change', scene: 'Octagon'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
