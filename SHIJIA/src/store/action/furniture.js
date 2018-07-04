import * as TYPES from '../action-types';
import {queryBanner,queryTuiJian} from '../../api/furniture'


let furniture= {
    queryBanner(){
        return async dispatch => {
            let bannerData = await queryBanner();
            dispatch({
                type: TYPES.QUERY_BANNER,
                bannerData
            });
        }
    },
    queryTuiJian(){
        return async dispatch=>{
            let tuijianData=await queryTuiJian();
            dispatch({
                type:TYPES.QUERY_TUIJIAN,
                tuijianData
            })
        }
    }
};
export default furniture;