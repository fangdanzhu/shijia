import React from 'react'
import {Alert} from 'antd'

export default class Tip extends React.Component{
	constructor(props,context){
		super(props,context)
	}
	render(){
		return <Alert message="未登录提醒" description="您现在还没有登陆点击" type="warning "    />
	}
}


