import axios from './index';

export function queryBanner() {
    return axios.get('/course/banner ')
}
export function queryTuiJian() {
    return axios.get('/course/tuijian ')
}