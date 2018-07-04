import React from 'react'
import NavBottom from '../component/NavBottom'

export default class Hotsale extends React.Component{
	constructor(props,context){
		super(props,context)
	}
	render(){
		return <section>
			<NavBottom/>
			热卖
		</section>
	}
}


