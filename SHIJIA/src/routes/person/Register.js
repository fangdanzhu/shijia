import React from 'react'
import {Icon} from 'antd'
import {register} from '../../api/person'
import md5 from 'blueimp-md5'
import {connect} from 'react-redux';
import action from '../../store/action'

 class Register extends React.Component{
	constructor(props,context){
		super(props,context)
	}
	
	personRegister= async (ev)=>{
		ev.preventDefault();
		console.log(123)
		let {userName,userTel,userPass} =this.refs;
		let result =  await register({
			 userName: userName.value,
	         phone: userTel.value,
	         passWord: userPass.value
		})
		
		if(result.code===0){
			this.props.queryInfo()
			this.props.history.push('/person')
		}
		
	}
	close=()=>{
		this.props.history.go(-1)
	}
	
	render(){
		return <section className="mask">
					<div className="exit" onClick={this.close}>
						<Icon type='close' />
					</div>		
					<div className="main">
						<form>
								<div><Icon type="user-add" /><input type="text" placeholder="请输入用户名" ref="userName" /></div>
								<div><Icon type="unlock" /><input type="text" placeholder="手机号" ref="userTel" /></div>
								<div><Icon type="lock" /><input type="password" placeholder="请输入密码" ref="userPass"/></div>
								<button onClick={this.personRegister}>注册</button>
								</form>
								<p>我已阅读《并适家用户协议》</p>
							</div>
				
		       </section>
	}
}


export default connect(state=>({...state}),action.person)(Register)
