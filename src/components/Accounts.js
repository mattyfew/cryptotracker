import React, { Component } from 'react';
import { connect } from 'react-redux';
import Exchange from './Exchange'
import AddWallet from './AddWallet'


import { ExchangeActions, CoinActions } from '../actions'
const { getExchangeInfo, addNewExchange } = ExchangeActions
const { getCoinInfo } = CoinActions

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
        this.props.getExchangeInfo()
        this.props.getCoinInfo()
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

    renderExchanges() {
        // NEED TO FIX THIS FUNCTION TO RENDER PROPERLY asyncly
        const { exchanges } = this.props

        if (!exchanges) {
            return (
                <div>Loading exchange details...</div>
            )
        }

        const exchangesJSX = Object.keys(exchanges).map(key => {
            return (<Exchange key={ key } exchangeName= { key } exchangeInfo={ exchanges[key] } />)
        } )

        return (
            <div className="exchanges-container" style={ styles.exchangesContainer}>
                { exchangesJSX }
            </div>
        )
    }

    render() {
        return (
            <div>
                <section style={styles.showExchanges} id="show-exchanges">
                    <h2>Your Linked Exchanges</h2>

                    { this.renderExchanges() }
                </section>

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

                <AddWallet />

            </div>
        )
    }
}

const styles = {
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
    exchangesContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr'
    }
}

function mapStateToProps(state) {
    // CODE DEBT: Might need to refactor this exchanges.exchanges (also in reducer index)
    console.log(state);
    return {
        exchanges: state.exchanges.exchanges,
        coinList: state.coinList.coinList
    }
}

export default connect(mapStateToProps, { getExchangeInfo, addNewExchange, getCoinInfo })(Accounts)
