import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class Person extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return <div>

        </div>
    }
}

export default connect()(Person)