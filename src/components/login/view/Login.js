import React, {Component } from 'react'
import appStyles from '../../../styles'
import { Button } from 'react-bootstrap'

const STYLES = {
  jumboLogin: {
    height: '100vh',
    backgroundColor: '#3B4D55',
    color: '#fff'
  },
  info: {
    padding: '16px'
  },
  button: {
    margin: '34px'
  }
}


export default class LoginView extends Component {

  render () {
    let content

    if (typeof window.web3 !== 'undefined') {
      const ethereumProvider = web3.currentProvider

      content = (
        <div>
          <div style={appStyles.textStyles.sectionHeader}>
            You have Metamask intalled!
          </div>
          <div style={appStyles.textStyles.sectionHeader}>
            <div style={STYLES.info}>
              <span>1. </span><span> Log in into Metamask</span>
            </div>
          </div>
          <div style={appStyles.textStyles.sectionHeader}>
            <span>2. </span>  Sign in with us
          </div>
          <Button
            bsSize="large"
            bsStyle="danger"
            style={STYLES.button}
            onClick={() => {this.props.login()}}>
            Sign In
          </Button>
        </div>
      )
    } else {
      content = (<div>
          <div style={appStyles.textStyles.sectionHeader}>
            Please install Metamask to continue!
          </div>
          <div style={appStyles.textStyles.sectionHeader}>
            Got to https://metamask.io for more information
          </div>
          <div style={appStyles.textStyles.sectionHeader}>
            or click <a href="https://metamask.io">here</a>.
          </div>
        </div>
      )
    }

    if (this.props.userProps.errorMsg.lenght > 0) {
      content = (
        <div>errorMsg</div>
      )
    }

    return (
      <div className="jumbotron" style={STYLES.jumboLogin}>
        <div className="container">
          <div className="row">
          <div className="col-md-12 col-xs-12 text-center"
            style={appStyles.textStyles.header}>
            Our app uses Metamask for the sign up process
          </div>
            <div style={STYLES.info}
              className="col-md-12 col-xs-12 text-center">
              {content}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
