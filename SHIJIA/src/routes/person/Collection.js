import React from 'react'
import '../../static/css/person.less'
import action from '../../store/action'
import {connect} from 'react-redux'
import NavBottom from '../../component/NavBottom'
import {queryCollect} from '../../api/detail'
import {Link} from 'react-router-dom'

 class Collection extends React.Component{
	constructor(props,context){
		super(props,context)
		this.state={
			queryMycol:[]
		}
	}
	async componentDidMount(){
		
	 let result = await queryCollect();
	 	if(result.code===0){
	 		this.setState({
	 			queryMycol:result.data
	 		})
	 	}
	}
	render(){
	       let data=this.state.queryMycol;
		return <section className="person_collection">
		     	我的收藏:{(!data || !data.length) ?'空的':null}
		     	{/*<ul>
					{data.map((item,index)=>{
                        console.log(item);
                        let {name,id,price,dec,pic,category}=item;
                        return <li className="clearfix" key={index}>
							<Link to={{
                                pathname:'/detail',
                                search: `?ID=${id}&category=${category}`
                            }}>
								<img src={pic} alt=""/>
								<div className="right clearfix">
									<p>{name}</p>
									<span>{dec.substr(0,22)}</span>
									<br/>
									<b>￥{price}</b>
								</div>
							</Link>
						</li>
					})}
				</ul>*/}
		      <NavBottom />
		      </section>
	}
}


export default connect(state=>({...state.person}),action.person)(Collection)
