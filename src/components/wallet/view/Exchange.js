import React, { Component } from 'react';
import { capitalise } from '../../../utils';

export default function Exchange({ exchangeName, exchangeInfo, coinList }) {
    return (
        <div className="exchange" style={ styles.exchange }>
            <h3 style={ styles.exchangeName }>{ capitalise(exchangeName) }</h3>

            <div className="balances-container">
                { /* TODO: figure out a way to not have to pass coinList */}
                { renderBalances(exchangeInfo, coinList) }
            </div>
        </div>
    )
}

function renderBalances(balances, coinList) {

    // TODO: render balances in decending order

    if (!coinList) {
        return (<div>Loading...</div>)
    }

    return Object.keys(balances).map(tickerName => {
        return (
            <div key={ tickerName } className="balance-row row" style={ styles.balanceRow }>
                <div className="col-sm-1"><img src={`/cryptocurrency-icons/32/color/${ tickerName.toLowerCase() }.png`} alt=""/></div>
                <div className="col-sm-8">
                    <p>{ tickerName }</p>
                    <p>{ coinList[tickerName] && coinList[tickerName].CoinName || "??????" }</p>
                </div>
                <div className="col-sm-3">
                    <p>{ balances[tickerName].available } { tickerName }</p>
                </div>
            </div>
        )
    })
}

const styles = {
    exchange: {
        backgroundColor: '#dfe6e9',
        padding: '20px 28px',
        flexBasis: '48%',
        marginBottom: 10
    },
    exchangeName: {
        margin: '0 0 15px',
        borderBottom: '1px solid #2d3436'
    },
    balanceRow: {
        borderBottom: '1px solid #2d3436',
        padding: '10px 0'
    }
}
