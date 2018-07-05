import React from 'react'
import {connect} from 'react-redux'


class Light extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return <div className="textilesBox">
               <h3>家纺</h3>
            <img src={require('../../static/images/jiafang.png')} alt="家纺" className="mainImg"/>

        </div>
    }
}

export default connect()(Light)