import React from 'react'
import {connect} from 'react-redux'

class Suite extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return <div>
            家具
        </div>
    }
}

export default connect()(Suite)