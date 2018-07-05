import React from 'react'
import {Icon, Button} from 'antd'
import NavBottom from '../../component/NavBottom'
import PersonDetail from './PersonDetail'
import {withRouter,NavLink} from 'react-router-dom'
import { Alert } from 'antd';
import {Link,Switch,Route} from 'react-router-dom'

 class Tip extends React.Component{
	constructor(props,context){
		super(props,context)
	}
	
	address = ()=>{
		console.log(1)
		this.props.history.push('person/address')
	}
	render(){
		return <section className="info tip">
					<div className="content">
					  <p></p>
					  <div>
					    <NavLink to="/person/login">登录</NavLink>/
					    <NavLink to="/person/register">注册</NavLink>
					  </div>
					 </div>
					 <ul className="info-item">
					 	<li><Icon type="solution" /><span>我的订单</span></li>
					 	<li><Icon type="star-o" /><span>我的收藏</span></li>
					 	<li><Icon type="red-envelope" /><span>我的钱包</span></li>
					 	<li onClick={this.address}><Icon type="heart-o" /><span>我的地址</span>	</li>	
					 	<li><Icon type="heart-o" /><span>我的关注</span></li>
					 	<li><Icon type="heart-o" /><span>我的关注</span></li>
					 </ul>
					<NavBottom />
				
		       </section>
	}
}

export default withRouter(Tip)
