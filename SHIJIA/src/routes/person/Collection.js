import React from 'react'
import '../../static/css/person.less'
import action from '../../store/action'
import {connect} from 'react-redux'
import NavBottom from '../../component/NavBottom'

 class Collection extends React.Component{
	constructor(props,context){
		super(props,context)
		this.state={
			queryMycol:[]
		}
	}
	async componentDidMount(){
		
	 let result = await this.props.queryMycol();
	 	if(result.code===0){
	 		this.setState({
	 			queryMycol:result.data
	 		})
	 	}
	}
	render(){
	
		return <section className="person_collection">
		     	我的收藏{(!this.state.queryMycol || !this.state.queryMycol.length) ?'空的':null}
		      <NavBottom />
		      </section>
	}
}


export default connect(state=>({...state.person}),action.person)(Collection)
