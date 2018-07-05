import * as TYPE from '../action-types'

let INIT_state = {
	personInfo:null,
}

export default function person(state =INIT_state,action){
	state = JSON.parse(JSON.stringify(state));
	switch(action.type){
		case TYPE.PERSON_QUERY_INFO :
			 let  {payload} = action;
			 if(payload.code===0){
			 	state.personInfo = payload.data
			 }
	
	}
	return  state;
}

