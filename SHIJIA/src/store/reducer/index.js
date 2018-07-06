import {combineReducers} from 'redux'
import person from './person'
import furniture from './furniture'
import couser from "./couser"
import pay from './pay'

let reducer = combineReducers({
    person,
    furniture,
    couser,
    pay
});

export default reducer;
