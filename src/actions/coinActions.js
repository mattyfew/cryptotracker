import { GET_COIN_INFO } from './types'
import cc from 'cryptocompare';

function getCoinInfo() {
    return (dispatch) => {
        cc.coinList()
        .then( coinList => dispatch({
                type: GET_COIN_INFO,
                coinList
            })
        )
    }
}

export default {
    getCoinInfo
}
