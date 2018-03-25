import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import appStore from './stores'
import { PersistGate } from 'redux-persist/integration/react'


import App from './App'
import {
  Login,
  Accounts,
  Prices,
  Welcome,
  Wallet,
  Home,
  ManageAccounts,
  Profile,
  Dashboard,
  Balances,
  Transactions,
  AddWallet,
  AddExchange
} from './routes'

const { store, persistor } = appStore.configureStore(browserHistory)

const router = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={ browserHistory }>
        <Route path="/" component={App}>
          <IndexRoute component={Welcome} />
          <Route path="login" component={Login} />
          <Route path="accounts" component={Accounts} />
          <Route path="prices" component={Prices} />

          <Route path="wallet" component={Wallet}>
            <Route component={Home} >

              <IndexRoute component={Dashboard} />
              <Route path="/wallet/balances" component={Balances} />
              <Route path="/wallet/transactions" component={Transactions} />
              <Route path="/wallet/add/wallet" component={AddWallet} />
              <Route path="/wallet/add/exchange" component={AddExchange} />

            </Route>

            <Route path="/manage-accounts" component={ManageAccounts} />
            <Route path="/profile" component={Profile} />

          </Route>

        </Route>
      </Router>
    </PersistGate>
  </Provider>
)

ReactDOM.render(router, document.getElementById('root'));
