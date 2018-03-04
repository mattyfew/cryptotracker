import React, {Component } from 'react'
import { connect } from 'react-redux'
import {AuthActions} from '../../../actions'
import Presentation from '../view/Login'


class LoginScreen extends Component {

  render () {
    const {auth} = this.props
    return (
      <Presentation
        login={this.props.login}
        authProps={auth} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(AuthActions.login())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
