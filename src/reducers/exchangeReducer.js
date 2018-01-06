import { GET_EXCHANGE_INFO } from '../actions/types'

const INITIAL_STATE = {}


export default (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case GET_EXCHANGE_INFO:
            console.log("inside reducer, case: GET_EXCHANGE_INFO")
            return { ...state, exchanges: action.payload }
        default:
            return state

    }
}
