import { combineReducers } from 'redux'
import exchangeReducer from './exchangeReducer'

const rootReducer = combineReducers({
    exchanges: exchangeReducer
})

export default rootReducer
