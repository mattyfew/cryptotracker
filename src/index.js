import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import store from './stores'


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
  Transactions
} from './routes'


const router = (
  <Provider store={store.configureStore()}>
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

          </Route>

          <Route path="/manage-accounts" component={ManageAccounts} />
          <Route path="/profile" component={Profile} />

        </Route>

      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(router, document.getElementById('root'));
