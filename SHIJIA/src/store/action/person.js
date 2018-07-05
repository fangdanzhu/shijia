import * as TYPE from '../action-types'
import {personInfo} from '../../api/person'


let person = {
	queryInfo(){
		return{
				type:TYPE.PERSON_QUERY_INFO,
				payload:personInfo()
		}
	}
	
}
export default person
