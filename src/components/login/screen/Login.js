import React, {Component } from 'react'

export default class LoginScreen extends Component {

  componentDidMount() {
    console.log(window.web3)
  }
  render () {
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
