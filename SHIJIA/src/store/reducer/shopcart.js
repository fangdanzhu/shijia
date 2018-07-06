import * as TYPE from '../action-types'

let INIT_STATE = {
	paymentList:[]
};
export default  function shopcart(state=INIT_STATE,action){
	
	state= JSON.parse(JSON.stringify(state));
	
	switch(action.type){
		case TYPE.SHOPCART_PAYMENT :
			    state.paymentList = action.shopList;
			    break;
			}
	 return state
} 



