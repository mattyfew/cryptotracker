import React, { Component } from 'react'
import { connect } from 'react-redux'

import AddWalletView from '../view/AddWallet'

import { WalletActions } from '../../../actions'
const { addNewWallet } = WalletActions

class AddWallet extends Component {
    render() {
        const { addNewWallet } = this.props
        return (
            <div>
                <AddWalletView
                    addNewWallet={ addNewWallet }
                />
            </div>
        )
    }
}

export default connect(null, { addNewWallet })(AddWallet)
