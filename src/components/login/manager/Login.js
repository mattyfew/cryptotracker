import React, { Component } from 'react'
import { connect } from 'react-redux'
import { UserActions } from '../../../actions'
import View from '../view/Login'


class LoginScreen extends Component {

  render () {
    const { user } = this.props
    return (
      <View
        login={this.props.login}
        userProps={user} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(UserActions.login())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
