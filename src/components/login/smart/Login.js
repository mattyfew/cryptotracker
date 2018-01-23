import React, {Component } from 'react'
import { connect } from 'react-redux'
import {AuthActions} from '../../../actions'
import Presentation from '../dumb/Login'


class LoginScreen extends Component {
  componentDidMount() {
    this.props.login()
  }

  checkAuthentication() {
    const auth = this.props.auth
    const checkRule = auth.addressUser !== undefined && auth.addressUser.length > 0 &&
      auth.addressUser.toUpperCase() === auth.addressSignature.toUpperCase()
    if(checkRule) {
      this.props.saveUserAddress()
      return `You are authenticated as ${auth.addressUser}. Please proceed to you dashboard >> LINK.`
    } else {
      return `you are not logged in.`
    }
  }

  render () {
    const {auth} = this.props
    const authenticated = this.checkAuthentication()
    return (
      <Presentation
        authenticated={authenticated}
      />
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
    login: () => dispatch(AuthActions.login()),
    verifySignature: () => dispatch(AuthActions.verifySignature()),
    saveUserAddress: () => dispatch(AuthActions.saveUserAddress())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
