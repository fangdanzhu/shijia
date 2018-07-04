import React from 'react'
import {connect} from 'react-redux'

class Suite extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        console.log(1);
        return <div>
            家具2233333333333333333333333333333333333333
            231231
            123
            123
            12312
            321
            312
        </div>
    }
}

export default connect()(Suite)