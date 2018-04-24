import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import appStore from './stores'
import { PersistGate } from 'redux-persist/integration/react'


import App from './App'
import {
  Login,
  Accounts,
  Prices,
  Welcome,
  Wallet
} from './routes'

const { store, persistor } = appStore.configureStore()

const router = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
          <div>
              <Route exact path="/" component={Welcome} />
              <Route path="/login" component={Login} />
              <Route path="/accounts" component={Accounts} />
              <Route path="/prices" component={Prices} />
              <Route path="/wallet" component={Wallet} />
          </div>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)

ReactDOM.render(router, document.getElementById('root'));
