import {createStore, applyMiddleware} from 'redux';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import reducer from './reducer/index';
let store = createStore(reducer, applyMiddleware(reduxLogger, reduxThunk));
export default store;
