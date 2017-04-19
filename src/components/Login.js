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
    signin: function() {
      dispatch({type: 'scene:change', scene: 'Octagon'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
