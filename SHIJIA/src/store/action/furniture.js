import * as TYPES from '../action-types';
import {queryBanner} from '../../api/furniture'

let furniture= {
    queryBanner(){
        return async dispatch => {
            let bannerData = await queryBanner();
            dispatch({
                type: TYPES.QUERY_BANNER,
                bannerData
            });
        }
    }
};
export default furniture;