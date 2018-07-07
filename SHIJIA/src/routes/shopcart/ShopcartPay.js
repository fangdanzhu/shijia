import React from 'react'
import NavBottom from '../../component/NavBottom'
import action from '../../store/action'
import {connect} from 'react-redux'

class ShopcartPay extends React.Component{
	constructor(props,context){
		super(props,context)
	}
	render(){
		return <section>
			订单信息支付
			<NavBottom />
		</section>
	}
}


export default connect(state=>({...state.shopcart}),action.shopcart)(ShopcartPay)
