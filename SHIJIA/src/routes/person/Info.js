import React from 'react'
import {Icon, Button} from 'antd'
import Tip from './Tip'
import NavBottom from '../../component/NavBottom'

export default class Info extends React.Component{
	constructor(props,context){
		super(props,context)
	}
	render(){
		return <section className="info">
					<div className="content">
					  <p></p>
					  <Button type="dashed" >登陆/注册</Button>
					 </div>
					 <ul className="info-item">
					 	<li><Icon type="solution" /><span>我的订单</span></li>
					 	<li><Icon type="star-o" /><span>我的收藏</span></li>
					 	<li><Icon type="red-envelope" /><span>我的钱包</span></li>
					 	<li><Icon type="heart-o" /><span>我的关注</span></li>
					 	<li><Icon type="heart-o" /><span>我的关注</span></li>
					 	<li><Icon type="heart-o" /><span>我的关注</span></li>
					 </ul>
					 
					<NavBottom />
		       </section>
	}
}


