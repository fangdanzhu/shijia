import * as TYPE from '../action-types'

let INIT_state = {
	personInfo:null,
	myCol:null
}

export default function person(state =INIT_state,action){
	state = JSON.parse(JSON.stringify(state));
	let payload = null;
	switch(action.type){
		case TYPE.PERSON_QUERY_INFO :
			 payload = action.payload;
			 if(payload.code===0){
			 	state.personInfo = payload.data
			 }
		case TYPE.PERSON_QUERY_MYCLO:	 
			 payload = action.payload;
			 console.log(payload.code)
			  if(payload.code===0){
			  	state.myCol = payload.data
			  }
			 
	}
	return  state;
}

