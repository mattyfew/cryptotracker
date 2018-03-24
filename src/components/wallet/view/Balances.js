import React, { Component } from 'react'
import Exchange from './Exchange'
import Wallet from './Wallet'
import AddWallet from './AddWallet'
import AddExchange from './AddExchange'

export default class Balances extends Component {

    renderExchanges() {
        const { exchanges, coinList } = this.props

        if (!exchanges) {
            return (
                <div>Loading exchange details...</div>
            )
        }

        const exchangesJSX = Object.keys(exchanges).map(key =>
            <Exchange
                key={ key }
                exchangeName={ key }
                exchangeInfo={ exchanges[key] }
                coinList={ coinList }
            />
        )

        return (
            <div className="exchanges-container" style={ styles.accountsContainer}>
                { exchangesJSX }
            </div>
        )
    }

    renderWallets() {
        const { wallets, coinList } = this.props

        if (!wallets) {
            return (
                <div>Loading wallet details...</div>
            )
        }

        // TODO: need to sort each wallet by the highest amount of a cryptocurrency

        const walletsJSX = wallets.map(wallet =>
            <Wallet
                key={ wallet.address }
                wallet={ wallet }
                coinList={ coinList }
            />
        )

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
                    <AddExchange
                        addNewExchange={ this.props.addNewExchange }
                    />
                    <AddWallet
                        addNewWallet={ this.props.addNewWallet }
                    />
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
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }
}
