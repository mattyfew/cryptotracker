import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxPromise from 'redux-promise';
import reducers from './reducers';

const configureStore = () => {
    const store = createStore(reducers, composeWithDevTools(applyMiddleware(reduxPromise)))
    // const store = createStore(reducers, compose(applyMiddleware(reduxPromise)))

    return store;
}

export default configureStore()
