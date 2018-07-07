import axios from "./index";

export function pushInfo(payload) {
    return axios.post('/show/put',{
        cont:(payload.info)
    });
}
export function queryIn(info) {
    return axios.get('/show/showList',{
        params:info
    })
}