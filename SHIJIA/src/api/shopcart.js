import axios from './index'

//=>获取购物车信息
export function queryGoodsInfo(){
	return axios.get('/store/info',{
		params:{
			state:0
		}
	});
}

//=>从购物车移出
export function remveGoodsInfo(removeList){
	return axios.post('/store/remove',removeList)
}

export function toPaying(payload) {
	return axios.post('/store/pay ',payload)
}