import {combineReducers} from 'redux'
import person from './person'
import furniture from './furniture'
import couser from "./couser"
<<<<<<< HEAD
import pay from './pay'
=======
import shopcart from "./shopcart"

>>>>>>> c4c353434977048dca36c9fde1c6fd8520b48100

let reducer = combineReducers({
    person,
    furniture,
    couser,
<<<<<<< HEAD
    pay
=======
    shopcart
>>>>>>> c4c353434977048dca36c9fde1c6fd8520b48100
});

export default reducer;
