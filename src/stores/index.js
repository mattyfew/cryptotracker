import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { authReducer, exchangeReducer, coinReducer, walletReducer } from '../reducers'

var store

export default {
  configureStore: () => {
    const reducers = combineReducers({
      auth: authReducer,
      exchanges: exchangeReducer,
      coinList: coinReducer,
      wallets: walletReducer
    })

    store = createStore(
      reducers,
      applyMiddleware(thunk)
    )

    return store
  },

  currentStore: () => {
    return store
  }
}
