import React, {Component } from 'react'
import { connect } from 'react-redux'
import {AuthActions} from '../../../actions'



class LoginScreen extends Component {
  componentDidMount() {
    this.props.login()
  }

  checkAuthentication() {
    const auth = this.props.auth
    if(auth.addressUser !== '' && auth.addressUser.toUpperCase() === auth.addressSignature.toUpperCase()) {
      return `You are authenticated as ${auth.addressUser}`
    } else {
      return `you are not authenticated. Please check your credentials.`
    }
  }

  render () {
    const {auth} = this.props
    let content
    if (typeof window.web3 !== 'undefined') {
      const ethereumProvider = web3.currentProvider
      content = <div>You have Metamask as a web3 provider!</div>
    } else {
      content = <div>Please install Metamask or another web3 enabled browser</div>
    }
    const authenticated = this.checkAuthentication()
    return (
      <div>
        <div>{content}</div>
        <div>{authenticated}</div>
      </div>
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
    verifySignature: () => dispatch(AuthActions.verifySignature())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
