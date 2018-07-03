import {combineReducers} from 'redux'
import person from './person'
import furniture from './furniture'

let reducer = combineReducers({
    person,
    furniture
});

export default reducer;
