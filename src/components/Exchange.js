import React, { Component } from 'react';

export default function Exchange({ exchangeName, exchangeInfo }) {
    return (
        <div className="exchange" style={ styles.exchange }>
            <h3 style={ styles.exchangeName }>{ capitalise(exchangeName) }</h3>

            <div className="balances-container">
                { renderBalances(exchangeInfo) }
            </div>
        </div>
    )
}

function renderBalances(balances) {

    // TODO: render balances in decending order

    return Object.keys(balances).map(tickerName => {
        if (balances[tickerName].available > 0) {
            return (
                <div key={ tickerName } className="balance-row row" style={ styles.balanceRow }>
                    <div className="col-sm-1"><img src="http://via.placeholder.com/35x35" alt=""/></div>
                    <div className="col-sm-8">{ tickerName }</div>
                    <div className="col-sm-3">{ balances[tickerName].available }</div>
                </div>
            )
        }
    })
}

function capitalise(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const styles = {
    exchange: {
        backgroundColor: '#dfe6e9',
        padding: '20px 28px',
        margin: '16px 8px'
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
