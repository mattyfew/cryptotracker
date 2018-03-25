import React, { Component } from 'react'
import { connect } from 'react-redux'

import BalancesView from '../view/Balances'

import { ExchangeActions, CoinActions, WalletActions } from '../../../actions'
const { getExchangeInfo, addNewExchange } = ExchangeActions
const { getCoinInfo } = CoinActions
const { getWalletInfo, addNewWallet } = WalletActions

class Balances extends Component {
    componentDidMount() {
        this.props.getExchangeInfo()
        this.props.getCoinInfo()
        this.props.getWalletInfo()
    }

    render() {
        const { addNewExchange, addNewWallet, exchanges, coinList, wallets } = this.props
        return (
            <div>
                <BalancesView
                    addNewExchange={ addNewExchange }
                    addNewWallet={ addNewWallet }
                    exchanges={ exchanges }
                    coinList={ coinList }
                    wallets={ wallets }
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        exchanges: state.exchanges.exchanges,
        coinList: state.coinList.coinList,
        wallets: state.wallets.wallets,
        user: state.user
    }
}

export default connect(mapStateToProps, {
    getExchangeInfo, getCoinInfo, getWalletInfo, addNewExchange, addNewWallet
})(Balances)
