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
                <NavLink to="/"><Icon type="home" /><span>首页</span></NavLink>
                <NavLink to="/hotsale"><Icon type="rocket" /><span>热度</span></NavLink>
<<<<<<< HEAD
            <NavLink to="/hotsale" className="sd"><Icon type="plus-circle-o"  style={{ fontSize: 46, color: '#818181' }}/></NavLink>
=======
            <NavLink to="/hotsale" className="sd">
                <Icon type="plus-circle-o" style={{fontSize:'1rem',color:'#cccccc',marginTop:0}}/>
            </NavLink>
>>>>>>> 5f1f6f9dcee748906f7190f797b8b9991f73e9b6
                <NavLink to="/shopcart"><Icon type="shopping-cart" /><span>购物车</span></NavLink>
                <NavLink to="/person"><Icon type="user" /><span>我的</span></NavLink>
            </footer>

        )
    }
}
export default withRouter(connect()(NavBottom))