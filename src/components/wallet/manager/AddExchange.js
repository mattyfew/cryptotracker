import React, { Component } from 'react'
import { connect } from 'react-redux'

import AddExchangeView from '../view/AddExchange'

import { ExchangeActions } from '../../../actions'
const { addNewExchange } = ExchangeActions

class AddExchange extends Component {
    render() {
        const { addNewExchange } = this.props
        return (
            <div>
                <AddExchangeView
                    addNewExchange={ addNewExchange }
                />
            </div>
        )
    }
}

export default connect(null, { addNewExchange })(AddExchange)
