import * as TYPES from "../action-types"
import {HeadList} from '../../api/couser'

let couse={
    queCate(){
        return async dispatch=>{
            let result=await HeadList(category)
            dispatch({
                type:PERSON_QUERY_BASE,
                result
            })
        }
    },
    queModel(){
        return async dispatch=>{
            let result=await HeadList(model)
            dispatch({
                type:PERSON_QUERY_DSRT,
                result
            })
        }
    }
}
export default couse