import React, { Component } from 'react';
import { capitalise } from '../../../utils';

export default class AddWallet extends Component {
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
        this.props.addNewWallet(this.state)
    }

    render() {
        return (
            <div>
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
