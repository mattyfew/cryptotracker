import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { authReducer, exchangeReducer, coinReducer, walletReducer } from '../reducers'
import { routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension';


let store

export default {
  configureStore: (history) => {
    const reducers = combineReducers({
      auth: authReducer,
      exchanges: exchangeReducer,
      coinList: coinReducer,
      wallets: walletReducer
    })

    const reduxRouterMiddleware = routerMiddleware(history)
    const middleware = [
      reduxRouterMiddleware,
      thunk
    ]

    store = createStore(
      reducers,
      composeWithDevTools(applyMiddleware(...middleware))
    )

    return store
  },

  currentStore: () => {
    return store
  }
}
