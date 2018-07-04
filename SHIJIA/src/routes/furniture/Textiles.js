import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class Textiles extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return <div>
     家纺
        </div>
    }
}

export default connect()(Textiles)