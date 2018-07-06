import * as TYPES from '../action-types';

let pay={
    payData(datas){
        return{
         type:TYPES.PAY_DATA,
            data:datas
        }
    }
};
export default pay