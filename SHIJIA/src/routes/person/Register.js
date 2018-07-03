import React from 'react'
import {Icon} from 'antd'

export default class Register extends React.Component{
	constructor(props,context){
		super(props,context)
	}
	render(){
		return <section className="mask">
					<div className="exit">
						<Icon type='close' />
					</div>		
					<div className="main">
						<form>
								<div><Icon type="user-add" /><input type="text" placeholder="请输入手机号" /></div>
								<div><Icon type="unlock" /><input type="password" placeholder="验证码" /></div>
								<div><Icon type="lock" /><input type="password" placeholder="请输入密码" /></div>
								<button>注册</button>
								</form>
								<p>我已阅读《并适家用户协议》</p>
							</div>
				
		       </section>
	}
}


