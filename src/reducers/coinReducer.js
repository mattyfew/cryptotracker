import { GET_COIN_INFO } from '../actions/types'

const INITIAL_STATE = {}


export default (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case GET_COIN_INFO:
            return { ...state, coinList: action.coinList.Data }

        default:
            return state
    }
}
