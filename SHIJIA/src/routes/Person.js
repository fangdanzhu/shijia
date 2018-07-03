import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'

import Login from './person/Login'
import Register from './person/Register'
import Info from './person/Info'

 export default  class Person extends React.Component{
	constructor(props,context){
		super(props,context)
	}
	render(){
		return <section className="personBox">
				<Switch>
					<Route path='/person' exact component={Info} />
					<Route path='/person/login'  component={Login} />
					<Route path='/person/register'  component={Register} />
				</Switch>
		      </section>
	}
}


