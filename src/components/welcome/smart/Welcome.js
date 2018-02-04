import React, { Component } from 'react'
import { connect } from 'react-redux'
import {AuthActions} from '../../../actions'
import Presentation from '../dumb/Welcome'


class WelcomeScreen extends Component {
    render() {
        return (
          <Presentation />
        )
    }
}

export default WelcomeScreen
