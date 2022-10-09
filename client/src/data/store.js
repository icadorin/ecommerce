import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './refucers';

const intialState = {}

const middleware = [trunk]

const store = createStore(
    rootReducer,
    intialState,
    compareWithDevTools(applyMiddleware(...middleware))
)

export default store;