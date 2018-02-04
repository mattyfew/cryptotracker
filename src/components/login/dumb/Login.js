import React, {Component } from 'react'

const STYLES = {
  jumboLogin: {
    height: '100vh',
    backgroundColor: '#3B4D55',
    color: '#fff'
  }
}


export default class LoginPresentation extends Component {
  render () {
    let content
    if (typeof window.web3 !== 'undefined') {
      const ethereumProvider = web3.currentProvider
      content = (
        <div>You have Metamask as a web3 provider! Please use it to log in.</div>
      )
    } else {
      content = (
        <div>Please install Metamask or another web3 enabled browser</div>
      )
    }
    if (this.props.authProps.errorMsg.lenght > 0) {
      content = (
        <div>errorMsg</div>
      )
    }
    return (
      <div className="jumbotron" style={STYLES.jumboLogin}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-xs-12">
              {content}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-xs-12">
              {this.props.authenticated}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
