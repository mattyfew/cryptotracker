import React, { Component } from 'react';
import { capitalise } from '../../../utils'

export default class AddExchange extends Component {
    constructor() {
        super()

        this.state = {
            key: '',
            secret: '',
            customerId: '',
            exchange: 'binance'
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.renderInstructions = this.renderInstructions.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log("new state", this.state) )
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.addNewExchange(this.state)
    }

    renderInstructions(exchangeName) {
        switch (exchangeName) {
            case 'binance':
                return (
                    <ol className="mb-5">
                        <li>Open the Binance <strong><a href="https://www.binance.com/userCenter/createApi.html" target="_blank">API page</a></strong></li>
                        <li><strong>Create a new API key</strong> by entering a label, such as '<strong>CoinTracker</strong>', and clicking the <strong>Create New Key</strong> button</li>
                        <li>If applicable, enter your <strong>two-factor authentication code</strong></li>
                        <li>Copy the <strong>API Key</strong> and <strong>Secret</strong> below</li>
                        <li className="mt-3"><strong className="text-muted mr-2 small">RECOMMENDED</strong> Disable trading access for this API key:
                            <ul>
                                <li>Click the <strong>Edit</strong> button</li>
                                <li>Disable the <strong>Enable Trading</strong> permission</li>
                                <li>Click <strong>Save</strong></li>
                                <li>If applicable, enter your <strong>two-factor authentication code</strong></li>
                            </ul>
                        </li>
                    </ol>
                )
                break;
            case 'bitstamp':
                return (
                    <ol className="mb-5">
                        <li>Open the Bitstamp <strong><a href="https://www.bitstamp.net/account/security/api/" target="_blank">API Access</a></strong> page</li>
                        <li>If you already have existing API keys, click <strong>New API Key</strong></li>
                        <li>Enable the following <strong>permissions</strong>:
                            <ul>
                                <li>Account balance</li>
                                <li>User transactions</li>
                            </ul>
                        </li>
                        <li>If applicable, enter your <strong>Two-Factor Authentication Code</strong></li>
                        <li>Click <strong>Generate Key</strong></li>
                        <li>Click <strong>Activate</strong></li>
                        <li>Confirm the new API key from the <strong>verification email</strong> you receive from Bitstamp</li>
                        <li>Copy the <strong>API Key</strong> and <strong>API Key Secret</strong> below</li>
                    </ol>
                )
                break;
            case 'kraken':
                return (
                    <ol className="mb-5">
                        <li>Navigate to <strong><a href="https://www.kraken.com" target="_blank">Kraken</a></strong> and log in</li>
                        <li>Navigate to <strong>Settings</strong> -&gt; <strong>API</strong></li>
                        <li>Click the <strong>Generate New Key</strong> button</li>
                        <li>Enable the following <strong>permissions</strong>:
                            <ul>
                                <li>Query Funds</li>
                                <li>Query Closed Orders &amp; Trades</li>
                                <li>Query Ledger Entries</li>
                            </ul>
                        </li>
                        <li>Click the <strong>Generate Key</strong> button</li>
                        <li>Copy the <strong>API Key</strong> and <strong>Private Key</strong> below</li>
                    </ol>
                )
                break;
            case 'poloniex':
                return (
                    <ol className="mb-5">
                        <li>Open the Poloniex <strong><a href="https://poloniex.com/apiKeys" target="_blank">API Keys</a></strong> page</li>
                        <li>Click the <strong>Create New Key</strong> button</li>
                        <li>If applicable, enter your <strong>two-factor authentication code</strong></li>
                        <li>Confirm the new API key from the <strong>verification email</strong> you receive from Poloniex</li>
                        <li>Back on the <strong><a href="https://poloniex.com/apiKeys" target="_blank">API Keys</a></strong> page, <strong>deselect</strong> the <strong>Enable Trading</strong> checkbox of the new API key</li>
                        <li>Copy the <strong>API Key</strong> and <strong>Secret</strong> below</li>
                    </ol>
                )
                break;
            default:
                return "Woops, we forgot to add instructions for this platform 😅"
        }
    }

    render() {
        return (
            <div>
                <section id="link-exchanges">
                    <h2 className="add-new-header">Add New Exchange</h2>

                    <form className="add-new-form" onSubmit={this.handleSubmit} >

                        <select value={this.state.exchange} onChange={this.handleChange} name="exchange">
                            <option value="binance" defaultValue>Binance</option>
                            <option value="bitstamp">Bitstamp</option>
                            <option value="kraken">Kraken</option>
                            <option value="poloniex">Poloniex</option>
                        </select>

                        <div className="add-new-instructions">
                            <h3>Instructions for adding { capitalise(this.state.exchange) }</h3>

                            { this.renderInstructions(this.state.exchange) }
                        </div>

                        <input className="add-new-input" type="text" name="key" value={this.state.key} onChange={this.handleChange} placeholder="API Key" />
                        <input className="add-new-input" type="text" name="secret" value={this.state.secret} onChange={this.handleChange} placeholder="API Secret" />
                        { this.state.exchange === "bitstamp" && <input className="add-new-input" type="text" name="customerId" value={this.state.customerId} onChange={this.handleChange} placeholder="Customer ID" /> }
                        <button className="add-new-submit" >Add Exchange API Access</button>
                    </form>
                </section>
            </div>
        )
    }
}
