import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ExchangeActions } from '../actions'
const { addNewExchange } = ExchangeActions


class AddExchange extends Component {
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

    render() {
        return (
            <div>
                <section style={styles.linkExchanges} id="link-exchanges">
                    <h2>Linking up exchanges to accounts will go here</h2>

                    <form style={styles.formStyles} onSubmit={this.handleSubmit} >

                        <select value={this.state.exchange} onChange={this.handleChange} name="exchange">
                            <option value="binance" defaultValue>Binance</option>
                            <option value="bitstamp">Bitstamp</option>
                            <option value="kraken">Kraken</option>
                            <option value="poloniex">Poloniex</option>
                        </select>

                        <input style={styles.formInput} type="text" name="key" value={this.state.key} onChange={this.handleChange} placeholder="API Key" />
                        <input style={styles.formInput} type="text" name="secret" value={this.state.secret} onChange={this.handleChange} placeholder="API Secret" />
                        { this.state.exchange === "bitstamp" && <input style={styles.formInput} type="text" name="customerId" value={this.state.customerId} onChange={this.handleChange} placeholder="Customer ID" /> }
                        <button style={styles.formButton} >Add Exchange API Access</button>
                    </form>
                </section>
            </div>
        )
    }
}

const styles = {
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
    }
}

const mapStateToProps = state => {
    return {
        wallets: state.wallets.wallets
    }
}

export default connect(mapStateToProps, { addNewExchange })(AddExchange);
