import axios from './index'


//=>检测是否登陆

export function checkLogin(){
	return axios.get('/person/login')
}

//=>注册
export function register(payload){
	return axios.post('/person/register',payload)
}


//=>获取用户信息
export function personInfo(){
	return axios.get('person/info');
}

//=>登录

export function login(payload){
	return axios.post('/person/login',payload)
}

//=>退出登陆
export function exitLogin(){
	return axios.get('/person/out')
}
