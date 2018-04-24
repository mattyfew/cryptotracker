import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {
  userReducer,
  exchangeReducer,
  coinReducer,
  walletReducer,
  assetReducer
} from '../reducers'
import { routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import createHistory from 'history/createBrowserHistory'


let store


const userPersistConfig = {
  key: 'user', // key is used to store state in localStorage
  storage,
  blacklist: ['navigation']
}

export default {

  configureStore: () => {
    const reducers = combineReducers({
      user: persistReducer(userPersistConfig, userReducer),
      exchanges: exchangeReducer,
      coinList: coinReducer,
      wallets: walletReducer,
      assets: assetReducer
    })

    const history = createHistory()

    const reduxRouterMiddleware = routerMiddleware(history)
    const middleware = [
      reduxRouterMiddleware,
      thunk
    ]

    store = createStore(
      reducers,
      composeWithDevTools(applyMiddleware(...middleware))
    )

    let persistor = persistStore(store)
    return { store, persistor }
  },

  currentStore: () => {
    return store
  }
}
