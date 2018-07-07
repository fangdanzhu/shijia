import React from 'react'
import {Button} from 'antd'
export default class Payed extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return <div className="payedBox">
              <h2>支付成功!</h2>
            <Button onClick={()=>{this.props.history.replace('/home')}}>返回主页</Button>
        </div>
    }
}
