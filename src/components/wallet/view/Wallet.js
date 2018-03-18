import React, { Component } from 'react';
import { capitalise } from '../../../utils';

export default function Wallet(props) {
    const {
        coinList,
        wallet: { balance, cryptocurrency, symbol, address }
    } = props

    if (!coinList) {
        return (<div>Loading...</div>)
    }

    return (

        <div className="wallet" style={ styles.wallet }>
            <h3 style={ styles.walletName }>{ address }</h3>

            <div className="balances-container">
                <div className="balance-row row" style={ styles.balanceRow }>
                    <div className="col-sm-1"><img src={`/cryptocurrency-icons/32/color/${ symbol.toLowerCase() }.png`} alt=""/></div>
                    <div className="col-sm-8">
                        <p>{ symbol }</p>
                        <p>{ coinList[symbol] && coinList[symbol].CoinName || "??????" }</p>
                    </div>
                    <div className="col-sm-3">{ balance }</div>
                </div>
             </div>
        </div>
    )
}

const styles = {
    wallet: {
        backgroundColor: '#dfe6e9',
        padding: '20px 28px',
        flexBasis: '48%',
        marginBottom: 10
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
