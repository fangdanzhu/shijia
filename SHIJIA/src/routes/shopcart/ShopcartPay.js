import React from 'react'
import NavBottom from '../../component/NavBottom'
<<<<<<< HEAD
import {Icon} from 'antd'
import {connect} from 'react-redux'
import {Button} from 'element-react';
import {Link} from 'react-router-dom'

 class ShopcartPay extends React.Component{
=======
import action from '../../store/action'
import {connect} from 'react-redux'

class ShopcartPay extends React.Component{
>>>>>>> c4c353434977048dca36c9fde1c6fd8520b48100
	constructor(props,context){
		super(props,context);
        console.log(this.props);
    }

	render(){
		let {pay}=this.props,
		total=0;
		pay.forEach(item=>{
			total+=item.price;
		});
		return <section className="payBox">
			<h3 className="head">
				<Icon type=""></Icon>
				确认订单
			</h3>
			<div className="self">
				<p>用户</p>
				<span>北京市朝阳区国美第一城3号院4004</span>
			</div>
			<p className="title">SJ 适家自营</p>
			<ul className="list">
				{pay&&pay.length!==0?pay.map((item,index)=>{
					 let {name,id,price,dec}=item;
					return <li className="clearfix" key={index}>
						<img src={require('../../static/images/she3.png')} alt=""/>
						<div className="right clearfix">
							<p>{name}</p>
							<span>{dec}</span>
							<br/>
							<b>￥{price}</b>
						</div>
					</li>
				}):null}
			</ul>
			<div className="peishong clearfix">
				<div className="left">
					<h5>配送服务</h5>
					<span>中小件送货时间</span>
				</div>
				<div className="right">
					<h6>顺丰快递</h6>
					<span>7-7 周六 09:00-15:00</span>
				</div>
			</div>
			<div className="tuihuan clearfix">
				<div className="left">
					<h5>退换无忧</h5>
					<span>自签收后7天退货,可免费上门取件</span>
				</div>
			</div>
			<div className="price">
				<div className="top clearfix">
					<h4>商品金额</h4>
					<span>￥{total.toFixed(2)}</span>
				</div>
				<div className="mid clearfix">
					<h4>运费 <span>(同城免运费)</span></h4>
					<span>￥6.00</span>
				</div>
				<div className="bot clearfix">
					<h2>总价: <span>￥{(total+6).toFixed(2)}</span></h2>
				</div>
				<div className="end clearfix">
					<Button type="success">微信支付</Button>
					<Button type="info">支付宝</Button>
				</div>

			</div>
		</section>
	}
}
export default connect(state=>({...state.pay}))(ShopcartPay)

export default connect(state=>({...state.shopcart}),action.shopcart)(ShopcartPay)
