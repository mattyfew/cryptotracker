import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { authReducer, exchangeReducer, coinReducer, walletReducer, assetReducer } from '../reducers'
import { routerMiddleware } from 'react-router-redux'

let store

export default {
  configureStore: (history) => {
    const reducers = combineReducers({
      auth: authReducer,
      exchanges: exchangeReducer,
      coinList: coinReducer,
      wallets: walletReducer,
      assets: assetReducer
    })

    const reduxRouterMiddleware = routerMiddleware(history)
    const middleware = [
      reduxRouterMiddleware,
      thunk
    ]

    store = createStore(
      reducers,
      applyMiddleware(...middleware)
    )

    return store
  },

  currentStore: () => {
    return store
  }
}
