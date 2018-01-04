import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reduxPromise from 'redux-promise'
// import reducers from './reducers'
import store from './stores'

import App from './App'
import { LoginScreen, Accounts, Prices, Welcome } from './routes'


const router = (
    <Provider store={store.configureStore()}>
      <Router history={ browserHistory }>

            <Route path="/" component={App}>
                <IndexRoute component={Welcome} />
                <Route path="login" component={LoginScreen} />
                <Route path="accounts" component={Accounts} />
                <Route path="prices" component={Prices} />
             </Route>

      </Router>
    </Provider>
)

ReactDOM.render(router, document.getElementById('root'));
