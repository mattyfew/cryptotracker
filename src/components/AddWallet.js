import React, { Component } from 'react';
import { connect } from 'react-redux';

import { WalletActions } from '../actions'
const { getWalletInfo, addNewWallet } = WalletActions
// const { getCoinInfo } = CoinActions

class AddWallet extends Component {
    constructor() {
        super()

        this.state = {
            cryptocurrency: 'bitcoin',
            address: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log("new state", this.state) )
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log("trying to submit");

        this.props.addNewWallet(this.state)
    }

    render() {
        return (
            <section>
                <h2>Add a New Wallet</h2>

                <form onSubmit={this.handleSubmit}>
                    <select value="" name="cryptocurrency" onChange={this.handleChange}>
                        <option value="bitcoin" defaultValue>BTC</option>
                        <option value="ethereum">ETH</option>
                        <option value="litecoin">LTC</option>
                    </select>
                    <input type="text" name="address" placeholder="Enter wallet address" onChange={this.handleChange}/>
                    <button>Submit</button>
                </form>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        wallets: state.wallets.wallets
    }
}

export default connect(mapStateToProps, { getWalletInfo, addNewWallet })(AddWallet);
