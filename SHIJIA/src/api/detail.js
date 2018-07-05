import axios from './index'

export function queryDetail(data) {
    let {ID,category}=data;
    return axios.get('/course/info',{
        params:{
            id:ID,
            category:category
        }
    })
}
export function queryTextiels(data) {
     return axios.get(`/course/info?category=${data}`)
}