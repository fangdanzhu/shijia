import * as TYPES from '../action-types';

export default function pay(state={pay:[]},action) {
    state=JSON.parse(JSON.stringify(state));
    switch (action.type){
        case TYPES.PAY_DATA:
            let data=action.data;
            state.pay=data;
    }
    return state
}