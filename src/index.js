import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reduxPromise from 'redux-promise'
import reducers from './reducers'

import App from './App'
import Welcome from './Welcome'


const router = (
    <Router history={ browserHistory }>
        <Route path="/" component={App}>
            <IndexRoute component={Welcome} />
         </Route>
    </Router>

)

ReactDOM.render(router, document.getElementById('root'));
