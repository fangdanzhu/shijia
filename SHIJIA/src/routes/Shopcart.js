import React from 'react'
import '../static/css/shopcart.less'
import NavBottom from '../component/NavBottom'
import ShopcartInfo from './shopcart/ShopcartInfo'
import ShopcartPay from './shopcart/ShopcartPay'
import {checkLogin} from '../api/person'
import {Alert} from 'antd'
import {Link} from 'react-router-dom'

import PropTypes from 'prop-types'
import {Switch,Route,Redirect} from 'react-router-dom'


export default class Shopcart extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state={
			isLogin:false
		}
	}
	
	async componentDidMount(){
		let result = await checkLogin()
		result.code===0?this.setState({isLogin:true}):null
	}
	render(){
		if(!this.state.isLogin){
			return <div className="notLogin">
					<h3>购物车</h3>
					<Link to='/person/login'>
						<Alert message="您还未登陆，点击跳转登陆！" type="error"/>
					</Link>
					<NavBottom />
		     	</div>
		 }
		
		return <section className="shopcartBox">
			  	<Switch>
			  		<Route path="/shopcart" exact component={ShopcartInfo} />
			  		<Route path="/shopcart/pay" exact component={ShopcartPay} />
			  	</Switch>
			  	<NavBottom />
		</section>
		
	}
}


