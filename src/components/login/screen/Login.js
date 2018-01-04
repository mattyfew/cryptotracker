import React, {Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../../actions'


class LoginScreen extends Component {
  componentDidMount() {
    this.props.login()
  }

  render () {
    console.log(this.props)
    // var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
    let content
    // check for web3 provider
    if (typeof window.web3 !== 'undefined') {
      const ethereumProvider = web3.currentProvider
      content = <div>You have Metamask as a web3 provider!</div>
    } else {
      content = <div>Please install Metamask or another web3 enabled browser</div>
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    user: state.auth
  }
}

const dispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(actions.login())
  }
}

export default connect(stateToProps, dispatchToProps)(LoginScreen)
