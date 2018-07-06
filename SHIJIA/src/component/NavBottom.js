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
                <NavLink  exact to="/"><Icon type="home" /><span>首页</span></NavLink>
                <NavLink to="/memi"><Icon type="rocket" /><span>觅me</span></NavLink>
            <NavLink to="/publish" className="sd">
                <Icon type="plus-circle-o" style={{fontSize:'.8rem',color:'#00000030',marginTop:'.12rem'}}/>
            </NavLink>
                <NavLink to="/shopcart"><Icon type="shopping-cart" /><span>购物车</span></NavLink>
                <NavLink to="/person"><Icon type="user" /><span>我的</span></NavLink>
            </footer>

        )
    }
}
export default withRouter(connect()(NavBottom))