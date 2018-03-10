import { GET_WALLET_INFO, ADD_NEW_WALLET } from '../actions/types'

const INITIAL_STATE = {
    wallets: []
}


export default (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case GET_WALLET_INFO:
            console.log("inside reducer, case: GET_WALLET_INFO", action)
            return { ...state, wallets: action.walletInfo }
        case ADD_NEW_WALLET:
            console.log("inside reducer, case: ADD_NEW_WALLET", action)
            return state

        default:
            return state

    }
}
