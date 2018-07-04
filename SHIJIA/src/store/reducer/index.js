import {combineReducers} from 'redux'
import person from './person'
import furniture from './furniture'
import couser from "./couser"

let reducer = combineReducers({
    person,
    furniture,
    couser
});

export default reducer;
