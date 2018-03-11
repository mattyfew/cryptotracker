import React, { Component } from 'react';
import { connect } from 'react-redux';
import { capitalise } from '../utils';

import { WalletActions } from '../actions'
const { getWalletInfo, addNewWallet } = WalletActions
// const { getCoinInfo } = CoinActions
// import axios from 'axios'


class AddWallet extends Component {
    constructor() {
        super()

        this.state = {
            cryptocurrency: 'bitcoin',
            address: '',
            wallets: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.renderWallets = this.renderWallets.bind(this)
    }

    componentDidMount() {
        this.props.getWalletInfo()
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log("new state", this.state) )
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.addNewWallet(this.state)
    }

    renderWallets() {
        if (this.props.wallets.length == 0) {
            return (
                <p>Loading wallets...</p>
            )
        }
        return this.props.wallets.map(wallet => {
            console.log("mapping", wallet);
            return (
                <div style={ styles.wallet} key={ wallet.address } className="wallet" >
                    <p>Currency: { wallet.cryptocurrency }</p>
                    <p>Balance: { wallet.balance }</p>
                </div>
            )
        })
    }

    render() {
        console.log("wallets?", this.props);
        return (

            <div>
                <section>
                    <h2>Your Wallets</h2>

                    { this.renderWallets() }
                </section>

                <section>
                    <h2>Add a New Wallet</h2>

                    <form onSubmit={this.handleSubmit}>
                        <select value={this.state.cryptocurrency} name="cryptocurrency" onChange={this.handleChange}>
                            <option value="bitcoin">BTC</option>
                            <option value="ethereum">ETH</option>
                            <option value="litecoin">LTC</option>
                        </select>
                        <input type="text" name="address" placeholder="Enter wallet address" onChange={this.handleChange}/>
                        <button>Submit</button>
                    </form>
                </section>
            </div>
        )
    }
}

const styles = {
    wallet: {
        backgroundColor: '#dfe6e9',
        padding: '20px 28px',
        margin: '16px 8px'
    },
    walletName: {
        margin: '0 0 15px',
        borderBottom: '1px solid #2d3436'
    },
    balanceRow: {
        borderBottom: '1px solid #2d3436',
        padding: '10px 0'
    }
}

function Wallet({ balance, cryptocurrency, symbol }) {
    return (
        <div className="wallet" style={ styles.wallet }>
            <h3 style={ styles.walletName }>{ capitalise(walletName) }</h3>

            <div className="balances-container">
                { renderBalances(walletInfo, coinList) }
            </div>
        </div>
    )

    function renderBalances(balances, coinList) {

        // TODO: render balances in decending order

        return Object.keys(balances).map(tickerName => {

            return (
                <div key={ tickerName } className="balance-row row" style={ styles.balanceRow }>
                    <div className="col-sm-1"><img src={`/cryptocurrency-icons/32/color/${ tickerName.toLowerCase() }.png`} alt=""/></div>
                    <div className="col-sm-8">
                        <p>{ tickerName }</p>
                        <p>{ coinList[tickerName] && coinList[tickerName].CoinName || "??????" }</p>
                    </div>
                    <div className="col-sm-3">{ balances[tickerName].available }</div>
                </div>
            )
        })
    }
}

const mapStateToProps = state => {
    return {
        wallets: state.wallets.wallets
    }
}

export default connect(mapStateToProps, { getWalletInfo, addNewWallet })(AddWallet);
