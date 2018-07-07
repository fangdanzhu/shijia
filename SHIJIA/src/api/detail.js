import axios from './index'
//获取单个商品信息
export function queryDetail(data) {
    let {ID,category}=data;
    return axios.get('/course/info',{
        params:{
            id:ID,
            category:category
        }
    })
}
//获取大分类
export function queryTextiels(data) {
     return axios.get(`/course/info?category=${data}`)
}
//获取小分类
export function queryMore(data) {
    let  {category, model}=data;
    return axios.get(`/course/info?category=${category}&&model=${model}`)
}
//是否登录
export function isLogin() {
    return axios.get('/person/login ')
}
//获取购物车列表
export function queryShopCart() {
    return axios.get('/store/info?state=0')
}
//添加购物车
export function addShopCart(data) {
    return axios.post('/store/add',data)
}
//移除购物车
export function removeShopCart(data) {
    return axios.post('/store/remove',data)
}
//获取收藏列表
export function queryCollect() {
    return axios.get('/store/queryClo')
}
//添加收藏
export function addCollect(data) {
    return axios.post('/store/addClo',data)
}
