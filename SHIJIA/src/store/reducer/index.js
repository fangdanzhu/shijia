import {combineReducers} from 'redux'
import person from './person'
import furniture from './furniture'
import couser from "./couser"
import pay from './pay'
import shopcart from "./shopcart"


let reducer = combineReducers({
    person,
    furniture,
    couser,
    pay,
    shopcart
});

export default reducer;
