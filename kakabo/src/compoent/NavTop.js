import React, {Component} from "react"
import {connect}from "react-redux"
import {withRouter, NavLink} from "react-router-dom"
import {Input,Icon} from 'antd';
const Search = Input.Search;

 class NavTop extends Component {

    constructor(props, context) {
        super(props, context)

    }

    render() {
        return <header className="headerNavBox clearfix">
            <div className='headerbox'>
                <Icon type="minus-square-o" />
                <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{ width: 200 }}/>
                <Icon type="table" />
            </div>

        </header>

    }
}
export default withRouter(connect(...action.couser)(NavTop))