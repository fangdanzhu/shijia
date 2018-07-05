import React from 'react'
import {Icon} from 'antd'
import {connect} from 'react-redux'
import {login} from '../../api/person'
import { Alert } from 'antd';
import {Link} from 'react-router-dom'
import action from '../../store/action'


 class Login extends React.Component{
	constructor(props,context){
		super(props,context)
	}
	close=()=>{
		this.props.history.go(-1)
	}
	personLogin= async (ev)=>{
		ev.preventDefault();
		
		let {username,password} = this.refs;

    let result = await login({
			 userName:username.value,
             passWord:password.value
		})

  
  
  if(result.code===0){
			this.props.queryInfo()
			this.props.history.push('/person')
		}else{
			alert('登陆失败')
		}
		
	}
	render(){
		return <section className="mask">
					<div className="exit" onClick={this.close}>
						<Icon type='close' />
					</div>		
					<div className="main">
						<form>
								<div><Icon type="user-add" /><input type="text"  placeholder="请输入用户名" ref="username"/></div>
								<div><Icon type="lock" /><input type="password" placeholder="请输入密码" ref="password"/></div>
								<button onClick={this.personLogin}>登陆</button>
								</form>
								<ul>
									<li><a href="javascript:;">忘记密码</a><Link to='/person/register'>注册账号</Link></li>
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

export default connect(state=>({...state.person}),action.person)(Login)
