import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getExchangeInfo } from './actions'


class Accounts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            key: '',
            secret: '',
            customerId: '',
            exchange: 'binance'
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(getExchangeInfo)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log("new state", this.state) )
    }

    handleSubmit(e) {
        e.preventDefault()

        axios.post('/add-new-exchange', this.state)
            .then(res => {
                console.log("we got something back", res)
            })
            .catch(err => console.log("there was an error in POST /add-new-exchange", err) )
    }



    render() {
        return (
            <div>
                <section style={styles.showExchanges}id="show-exchanges">
                    <h2>Your Linked Exchanges</h2>

                    <div>
                        Exchanges will be rendered here
                    </div>
                </section>

                <section style={styles.linkExchanges}id="link-exchanges">
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
                        { /* <input style={styles.formInput} type="text" name="customerId" value={this.state.customerId} onChange={this.handleChange} placeholder="Customer ID" /> */ }
                        <button style={styles.formButton} >Add Exchange API Access</button>
                    </form>
                </section>
            </div>
        )
    }
}

const styles = {
    showExchanges: {
        border: '2px solid red',
        margin: '25px 0'
    },
    linkExchanges: {
        border: '2px solid blue'
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
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(Accounts)
