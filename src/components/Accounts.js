import React, { Component } from 'react';
import { connect } from 'react-redux';
import Exchange from './Exchange'
import Wallet from './Wallet'
import AddWallet from './AddWallet'
import AddExchange from './AddExchange'

import { ExchangeActions, CoinActions, WalletActions } from '../actions'
const { getExchangeInfo, addNewExchange } = ExchangeActions
const { getCoinInfo } = CoinActions
const { getWalletInfo, addNewWallet } = WalletActions

class Accounts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            key: '',
            secret: '',
            customerId: '',
            exchange: 'binance'
        }
    }

    componentDidMount() {
        this.props.getExchangeInfo()
        this.props.getCoinInfo()
        this.props.getWalletInfo()
    }

    renderExchanges() {
        const { exchanges } = this.props

        if (!exchanges) {
            return (
                <div>Loading exchange details...</div>
            )
        }

        const exchangesJSX = Object.keys(exchanges).map(key => {
            return (<Exchange key={ key } exchangeName= { key } exchangeInfo={ exchanges[key] } />)
        })

        return (
            <div className="exchanges-container" style={ styles.accountsContainer}>
                { exchangesJSX }
            </div>
        )
    }

    renderWallets() {
        const { wallets } = this.props

        if (!wallets) {
            return (
                <div>Loading wallet details...</div>
            )
        }
        const walletsJSX = wallets.map(wallet => {
            return (
                <Wallet key={ wallet.address } wallet={ wallet } />
            )
        })

        return (
            <div className="wallets-container" style={ styles.accountsContainer}>
                { walletsJSX }
            </div>
        )
    }

    render() {
        return (
            <div>
                <section style={styles.wallets} id="show-wallets">
                    <h2>Your Linked Wallets</h2>
                    { this.renderWallets() }
                </section>

                <section style={styles.showExchanges} id="show-exchanges">
                    <h2>Your Linked Exchanges</h2>
                    { this.renderExchanges() }
                </section>

                <section style={styles.linkExchanges} id="link-exchanges">
                    <AddExchange />
                    <AddWallet />
                </section>
            </div>
        )
    }
}

const styles = {
    wallets: {
        border: '2px solid purple',
        margin: '25px',
        padding: '30px'
    },
    showExchanges: {
        border: '2px solid red',
        margin: '25px',
        padding: '30px'
    },
    linkExchanges: {
        border: '2px solid blue',
        margin: '0 25px',
        padding: '30px'
    },
    formStyles: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 500,
        margin: '0 auto'
    },
    formInput: {
        marginTop: 15,
        padding: 20
    },
    formButton: {
        marginTop: 15,
        padding: 20
    },
    accountsContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr'
    }
}

function mapStateToProps(state) {
    return {
        exchanges: state.exchanges.exchanges,
        coinList: state.coinList.coinList,
        wallets: state.wallets.wallets
    }
}

export default connect(mapStateToProps, {
    getExchangeInfo, getCoinInfo, getWalletInfo
})(Accounts)
