import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, NavLink} from 'react-router-dom';
import { Input,Icon } from 'antd';
const Search = Input.Search;
 class NavBottom extends Component {

    constructor(props, context) {
        super(props, context)
    }
    render() {
        return ( <footer className="footerNavBox">
                <NavLink to="/course"><Icon type="home" /><span>首页</span></NavLink>
                <NavLink to="/cours"><Icon type="rocket" /><span>热度</span></NavLink>
                <NavLink to="/cour"><Icon type="shopping-cart" /><span>购物车</span></NavLink>
                <NavLink to="/cou"><Icon type="user" /><span>我的</span></NavLink>
            </footer>

        )
    }
}
export default withRouter(connect()(NavBottom))