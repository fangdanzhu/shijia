import * as TYPES from "../action-types"
import {HeadList} from '../../api/couser'

let couse={
    queCate(){
        return async dispatch=>{
            let result=await HeadList()
            dispatch({
                type:TYPES.PERSON_QUERY_BASE,
                result
            })
        }
    }

}
export default couse
