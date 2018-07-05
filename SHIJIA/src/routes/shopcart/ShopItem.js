import React from 'react'
import {Checkbox} from 'antd'
import PropTypes from 'prop-types'
import {remveGoodsInfo} from '../../api/shopcart'

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

export default class ShopItem extends React.Component{
	constructor(props,context){
		super(props,context)
	}
	
	removeShopInfo= async()=>{
		let {id,category} = this.props.item
		let result = await remveGoodsInfo(
			{
				courseID:id,
				category
			}
		);
		if(result.code===0){
			console.log('kk')
		}
		
	}
	render(){
		let {id,name,pic,dec,price,type} = this.props.item
		let {isEdit} = this.props;
		return <li className="shopItem">
							<dl>
								<dd className='check'><Checkbox onChange={onChange} /></dd>
								<dt>
								<img src={pic} />
								</dt>
								<dd>
									<h4>{name}</h4>
									<p>{dec}</p>
									<span>价格:￥{price}</span>
								</dd>
								{isEdit?<dd><button onClick={this.removeShopInfo}>删除</button></dd>:null}
								</dl>
		      </li>
		 
	}
}


