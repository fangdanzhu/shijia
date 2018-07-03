import * as TYPES from '../action-types'
import action from '../action/index'
let stateInit={
    bannerData:[]
};
export default function furniture(state=stateInit,action){
        switch (action.type){
            case TYPES.QUERY_BANNER:
                let {code,data}=action.bannerData;
                if(parseFloat(code)===0) state.bannerData=data;
        }
    return  state;
}
