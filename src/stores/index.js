import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { authReducer, exchangeReducer, coinReducer } from '../reducers'

var store

export default {
  configureStore: () => {
    const reducers = combineReducers({
      auth: authReducer,
      exchanges: exchangeReducer,
      coinList: coinReducer
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
