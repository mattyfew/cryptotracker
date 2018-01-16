import { GET_EXCHANGE_INFO, ADD_NEW_EXCHANGE } from '../actions/types'

const INITIAL_STATE = {}


export default (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case GET_EXCHANGE_INFO:
            console.log("inside reducer, case: GET_EXCHANGE_INFO", action)
            return { ...state, exchanges: action.exchangeInfo }
        case ADD_NEW_EXCHANGE:
            console.log("inside reducer, case: ADD_NEW_EXCHANGE", action)
            return state
        default:
            return state

    }
}
