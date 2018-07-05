import React from 'react'
import NavBottom from '../../component/NavBottom'

export default class ShopcartPay extends React.Component{
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


