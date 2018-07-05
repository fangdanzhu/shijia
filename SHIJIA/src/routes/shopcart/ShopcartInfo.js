import React from 'react'
import ShopItem from './ShopItem'
import {Icon,Checkbox,Button} from 'antd'
import {Switch,Route,withRouter,Link} from 'react-router-dom'
import ShopcartPay from './ShopcartPay'
import {queryGoodsInfo} from '../../api/shopcart'

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}
	
class ShopcartInfo extends React.Component{
	   constructor(props,context){
	  	 	super(props,context);
	  	 	this.state={
	  	 		isEdit:false,
	  	 		goodsList:[]
	  	 	}
	   }
	
	async componentDidMount(){
		let result = await queryGoodsInfo();
		if(result.code===0){
				console.log(result)
			this.setState({
				goodsList:result.data
			})
		}
		
	}
	editState=()=>{
	
		this.setState({
			isEdit:!this.state.isEdit
		})
	}
		
	render(){
		let {goodsList,isEdit} = this.state;
		if(!goodsList || !goodsList.length){
		return  <div className="shopItem_empty">
							<h3>购物车</h3>
							<div>
							<Icon type="shopping-cart" />
							<span>购物车就像生活一样,爱生活</span>
							<span>就不要空荡荡</span>
							</div>
					</div>;
		} 
		return <section className="shopList">
			<h3>购物车<span onClick={this.editState}>{this.state.isEdit?'完成':'编辑'}</span></h3>
			<div className="shopcartList">
							<ul>
									{goodsList.map((item,index)=>{
										return <ShopItem item={item} key={index} isEdit={isEdit}  />
									})}
							</ul>
							<div className="shopcartSum">
								  	 <form> <Checkbox onChange={onChange}>全选</Checkbox> </form>
								  	 <div>
										  	 	<span>合计:0.00</span>
										  	 	<p>不含运费优化扣减</p>
								  	 </div>
								  	 <div>
								  			 <Link to="/shopcart/pay"> <Button type="danger">去结算</Button></Link>								     </div>
							 </div>
				</div>
			  </section>

		}
	}

export default withRouter(ShopcartInfo)
