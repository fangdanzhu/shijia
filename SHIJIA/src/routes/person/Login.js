import React from 'react'
import {Icon} from 'antd'
import {connect} from 'react-redux'

 class Login extends React.Component{
	constructor(props,context){
		super(props,context)
	}
	close=()=>{
		console.log(this.props.history)
		this.props.history.go(-1)
	}
	render(){
		return <section className="mask">
					<div className="exit" onClick={this.close}>
						<Icon type='close' />
					</div>		
					<div className="main">
						<form>
								<div><Icon type="user-add" /><input type="text"  placeholder="请输入手机号"/></div>
								<div><Icon type="lock" /><input type="password" placeholder="请输入密码" /></div>
								<button>登陆</button>
								</form>
								<ul>
									<li><a href="javascript:;">忘记密码</a><a href="javascript:;">注册账号</a></li>
									<li><h4>其他登陆方式</h4></li>
									<li>
										<Icon type="qq" />
										<Icon type="weibo-circle" />
										<Icon type="weibo" />
									</li>
								</ul>
								<p>我已阅读<b>《并适家用户协议》</b></p>
							</div>
							
				
		       </section>
	}
}

export default connect()(Login)
