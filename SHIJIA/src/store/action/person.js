import * as TYPE from '../action-types'
import {personInfo,myCollection} from '../../api/person'


let person = {
//	=>用户信息
	queryInfo(){
		return{
				type:TYPE.PERSON_QUERY_INFO,
				payload:personInfo()
		}
	},
//	=>我的收藏
	queryMycol(){
		return async dispatch =>{  
			   let  payload = await myCollection();
			   dispatch({
				   	type:TYPE.PERSON_QUERY_MYCLO,
					payload
			   })
				
		}
	}
	
}
export default person
// return async dispatch => {
//          let bannerData = await queryBanner();
//          dispatch({
//              type: TYPES.COURSE_QUERY_BANNER,
//              bannerData
//          });
//      }