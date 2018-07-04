import * as TYPES from '../action-types'

let stateInit={
    bannerData:[],
    tuijianData:[],
};
export default function furniture(state=stateInit,action){
    state=JSON.parse(JSON.stringify(state));
        switch (action.type){
            case TYPES.QUERY_BANNER:
               let  {code,data}=action.bannerData;
                if(parseFloat(code)===0) state.bannerData=data;
                break;
            case TYPES.QUERY_TUIJIAN:
                let {code:code1,data:data1}=action.tuijianData;
                if(parseFloat(code1)===0)state.tuijianData=data1;
        }
    return  state;
}
