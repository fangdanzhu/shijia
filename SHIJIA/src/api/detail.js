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
export function queryMore(data) {
    let  {category, model}=data;
    return axios.get(`/course/info?category=${category}&&model=${model}`)
}
export function isLogin() {
    return axios.get('/person/login ')
}
export function queryShopCart() {
    return axios.get('/store/info?state=0')
}
export function addShopCart(data) {
    return axios.post('/store/add',data)
}
export function removeShopCart(data) {
    return axios.post('/store/remove',data)
}
