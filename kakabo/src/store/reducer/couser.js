import * as TYPES from "../action-types"

let INDE_STATE={
    banner:[]
}
export default function course(state=INDE_STATE,action) {state=INDE_STATE,action
    state = JSON.parse(JSON.stringify(state));
   switch (action.type){
       case TYPES.PERSON_QUERY_BASE:
            let {result}=action;
            state.banner=parseFloat(result)
           break
   }
    return state
}
