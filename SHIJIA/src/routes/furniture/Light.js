import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class Light extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return <div>
 灯饰
        </div>
    }
}

export default connect()(Light)