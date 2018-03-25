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
                    <h2 className="add-new-header">Add a New Wallet</h2>


                    <form className="add-new-form"  onSubmit={this.handleSubmit}>
                        <p>Cryptotrackr will automatically sync the transactions and balances from the public addresses you add below. We currently support Bitcoin, Ethereum, and Litecoin addresses.</p>
                        <select value={this.state.cryptocurrency} name="cryptocurrency" onChange={this.handleChange}>
                            <option value="bitcoin">BTC</option>
                            <option value="ethereum">ETH</option>
                            <option value="litecoin">LTC</option>
                        </select>
                        <input className="add-new-input" type="text" name="address" placeholder="Enter wallet address" onChange={this.handleChange}/>
                        <button className="add-new-submit">Submit</button>
                    </form>
                </section>
            </div>
        )
    }
}
