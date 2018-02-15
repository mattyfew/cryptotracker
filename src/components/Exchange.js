import React, {Component} from 'react';

export default function Exchange({ exchangeName, exchangeInfo }) {
    return (<div className="exchange">
        <h3>{exchangeName}</h3>

        <div className="balances-container">
            { renderBalances(exchangeInfo) }
        </div>
    </div>)
}

function renderBalances(balances) {
    return Object.keys(balances).map(tickerName => {
        if (balances[tickerName].available > 0) {
            return (
                <div key={ tickerName } className="balance-row">
                    <p>{ tickerName }: Available: { balances[tickerName].available }</p>
                </div>
            )
        }
    })

}
