import React from 'react'
import {Checkbox} from 'antd'
import PropTypes from 'prop-types'
import {remveGoodsInfo,queryGoodsInfo} from '../../api/shopcart'



export default class ShopItem extends React.Component{
	constructor(props,context){
		super(props,context)
		this.state={
			flag:false, //操作删除按钮,

		}
	}
	
	removeShopInfo= async()=>{
		let {id,category} = this.props.item
		let result = await remveGoodsInfo(
			{
				courseID:id,
				category
			}
		)
		if(result.code===0){
			this.props.fn(this.props.item.id)
		}
		
		
	}
//	=>复选框
	checked=(ev)=>{
	let {id} = this.props.item
	if(ev.target.checked){
		this.props.checked(id,true)
	}else{
		this.props.checked(id,false)
	}

	}
	render(){
		let {id,name,pic,dec,price,type,checkState} = this.props.item
		let {isEdit} = this.props;
		return <li className="shopItem">
							<dl>
								<dd className='check'><Checkbox onChange={this.checked}  checked={checkState?true:false} /></dd>
								<dt>
								<img src={pic} />
								</dt>
								<dd>
									<h4>{name}</h4>
									<p className={isEdit?'edit':''}>{dec}</p>
									<span>价格:￥{price}</span>
								</dd>
								{isEdit?<dd><button onClick={this.removeShopInfo}>删除</button></dd>:null}
								</dl>
		      </li>
		 
	}
}


