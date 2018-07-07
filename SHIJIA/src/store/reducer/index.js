import {combineReducers} from 'redux'
import person from './person'
import furniture from './furniture'
import couser from "./couser"
import shopcart from "./shopcart"


let reducer = combineReducers({
    person,
    furniture,
    couser,
    shopcart
});

export default reducer;
