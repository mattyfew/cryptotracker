import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { authReducer, exchangeReducer } from '../reducers'

var store

export default {
  configureStore: (history) => {
    const reducers = combineReducers({
      auth: authReducer,
      exchanges: exchangeReducer
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
