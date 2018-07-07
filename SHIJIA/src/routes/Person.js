import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'

import Login from './person/Login'
import Register from './person/Register'
import Info from './person/Info'
import Tip from './person/Tip'
import PersonDetail from './person/PersonDetail'
import Collection from  './person/Collection'

import '../static/css/person.less'
import {connect} from 'react-redux'

import {checkLogin} from '../api/person'
import  action from '../store/action'

 class Person extends React.Component{
	constructor(props,context){
		super(props,context)
		this.state={
			isLogin:false
		}
	}
	async componentWillMount(){
		let result = await checkLogin();
		if(result.code==0){
			this.setState({
				isLogin:true
			})
		}
		
	}
	 async componentWillReceiveProps() {
       let result = await checkLogin();
		if(result.code==0){
			this.setState({
				isLogin:true
			})
    		
		}else{
			this.setState({
				isLogin:false
			})
		}
	}
	render(){
		return <section className="personBox">
				<Switch>
					<Route path='/person' exact render={()=>{
						if(this.state.isLogin){
							return <Info />
						}
						return <Tip />
						}
						
					} />
					<Route path='/person/login'  component={Login} />
					<Route path='/person/register'  component={Register} />
					<Route path='/person/address' component={PersonDetail} />
					<Route path='/person/collection' component={Collection} /> 
					<Redirect to='/person' />
				</Switch>
		      </section>
	}
}


 export default  connect(state=>({...state.person}),action.person)(Person)
