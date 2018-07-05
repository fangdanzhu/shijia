import {createStore, applyMiddleware} from 'redux';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import reducer from './reducer/index';
import reduxPromise from 'redux-promise';

let store = createStore(reducer, applyMiddleware(reduxLogger, reduxThunk,reduxPromise));
export default store;
