import React, { Component } from 'react'
import { connect } from 'react-redux'

import BalancesView from '../view/Balances'

import { ExchangeActions, CoinActions, WalletActions, AuthActions } from '../../../actions'
const { getExchangeInfo, addNewExchange } = ExchangeActions
const { getCoinInfo } = CoinActions
const { getWalletInfo, addNewWallet } = WalletActions
const { getUserInfo, getUserInfoAndResources } = AuthActions

class Balances extends Component {
    componentDidMount() {
        if (!this.props.addressUser){
            this.props.getUserInfoAndResources()
        } else {
            this.props.getExchangeInfo()
            this.props.getCoinInfo()
            this.props.getWalletInfo()
        }
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
        auth: state.auth
    }
}

export default connect(mapStateToProps, {
    getUserInfoAndResources, getUserInfo, getExchangeInfo, getCoinInfo, getWalletInfo, addNewExchange, addNewWallet
})(Balances)
