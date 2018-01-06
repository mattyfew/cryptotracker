import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import { Provider } from 'react-redux'
import store from './configureStore'

import App from './App'
import Welcome from './Welcome'
import Login from './Login'
import Accounts from './Accounts'
import Prices from './Prices'

const router = (
    <Provider store={store}>
        <Router history={ browserHistory }>
            <Route path="/" component={App}>
                <IndexRoute component={Welcome} />
                <Route path="login" component={Login} />
                <Route path="accounts" component={Accounts} />
                <Route path="prices" component={Prices} />
             </Route>
        </Router>
    </Provider>

)

ReactDOM.render(router, document.getElementById('root'));
