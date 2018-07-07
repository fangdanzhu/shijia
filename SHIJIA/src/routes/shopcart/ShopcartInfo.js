import React from 'react'
import ShopItem from './ShopItem'
import {Icon,Checkbox,Button} from 'antd'
import {Switch,Route,withRouter,Link} from 'react-router-dom'
import ShopcartPay from './ShopcartPay'
import {queryGoodsInfo,remveGoodsInfo} from '../../api/shopcart'
import action from '../../store/action'
import {connect} from 'react-redux'


class ShopcartInfo extends React.Component{
	   constructor(props,context){
	  	 	super(props,context);
	  	 	this.state={
	  	 		isEdit:false,
	  	 		goodsList:[],
	  	 		all:false,
	  	 		price:0.00
	  	 	}
	   }
	
	async componentDidMount(){
		let result = await queryGoodsInfo();
		if(result.code===0){
			//给每一项添加一个是否选中的属性
			result.data.map(item=>{
					item.checkState =false
					return item
			})
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
	
	
//=>删除商品后子组件通知父组件重新渲染
	updataShopcart=(id)=>{
			let newData = this.state.goodsList.filter(item=>item.id!==id);
			this.setState({
				goodsList:newData
			})
			this.computedPrice()
	}
	
	//全选和非全选
  	componentWillUpdate(){
  			//	=>计算价格	
      this.computedPrice = ()=>{
        	let price = 0;
					this.state.goodsList.forEach(item=>{
						if(item.checkState){
							price += item.price
						}
					})
					this.setState({
						price
					})
	        }
  	
  		this.checked=(id,state)=>{
				let {goodsList} = this.state;
				goodsList.forEach(item=>{
					 if(item.id===id){
					    	item.checkState =state
					    	return true
					    }
				})
				
				let len = goodsList.filter(item=>(item.checkState)).length
				if(len===goodsList.length){
					this.setState({
						all:true
					})
				}else{
					this.setState({
						all:false
					})
				}
				this.computedPrice()

		}
  		this.allSelect = async (e)=>{
		  		await this.setState({
		  			all:!this.state.all
		  		})
		 		let {goodsList} = this.state;
		 		let tempAry = goodsList.map(item=>{
		 				item.checkState = e.target.checked
		 			return item
		 		})
		 		
		 		this.setState({
		 			goodsList:tempAry
		 		})
  	  	this.computedPrice()
     	}
  	}
  //去结算	
  	payment= async ()=>{
				let {goodsList} =this.state;
				let result = goodsList.some(item=>(item.checkState))
				if(!result){
					alert('请至少选中一个商品')
					return ;
				}
			
				// 发送支付数据并跳转支付
				let {payment} = this.props;
				let shopList = goodsList.filter(item=>(item.checkState))
			    payment(shopList);
			   
			    let  tempAry = goodsList.filter(item=>(item.checkState))
			    let removeList = []
			    tempAry.forEach(item=>{
			    	let {id,category} = item;
			    	removeList.push({courseID:id,category})
			    })
			    console.log(removeList)
			    let  res = await remveGoodsInfo(removeList)
				this.props.history.push('/shopcart/pay')			
				
		
	 }
  	
	render(){
		let {goodsList,isEdit,all} = this.state;
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
			<h3>购物车<span onClick={this.editState}>{isEdit?'完成':'编辑'}</span></h3>
			<div className="shopcartList">
							<ul>
									{goodsList.map((item,index)=>{
										return <ShopItem item={item} key={index} isEdit={isEdit} fn={this.updataShopcart} checked={this.checked} />
									})}
							</ul>
							<div className="shopcartSum">
								  	 <form><Checkbox onChange={this.allSelect} ref="all" checked={all?true:false} >全选/不全选 </Checkbox> </form>
								  	 <div>
										  	 	<span>合计:{this.state.price.toFixed(2)}</span>
										  	 	<p>不含运费优化扣减</p>
								  	 </div>
								  	 <div>
								  			 <Button type="danger" onClick={this.payment}>去结算</Button>								     </div>
							 </div>
				</div>
			  </section>

		}
	}

export default withRouter(connect(state=>({...state.shopcart}),action.shopcart)(ShopcartInfo))
