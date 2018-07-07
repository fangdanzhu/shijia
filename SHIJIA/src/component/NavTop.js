import React, {Component} from "react"
import {connect}from "react-redux"
import {withRouter, NavLink,Link} from "react-router-dom"
import {Input, Icon} from 'antd';
import action from '../store/action/index';
import {HeadList} from "../api/couser"
const Search = Input.Search;

class NavTop extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {val: "", banner: []}

    }
    handlChange = async (ev) => {
        let {banner} = this.state;
        let value = ev.target.value;
        value.length==0?this.setState({banner:[]}):null;
        if (value) {
            let result = await HeadList({cont: value});
            if (result.code === 0) {
                if (result.searchData instanceof Array) {
                    this.setState({
                        banner: result.searchData
                    })
                }
            }
        }
    };


    render() {
        return <header className="headerNavBox clearfix">
            <div className='headerbox'>
                <Icon type="minus-square-o" style={{fontSize: 30, color: '#FFF'}}/>
                <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{width: 200}} onChange={this.handlChange}
                    valve={this.state.val}/>
                <Icon type="table" style={{fontSize: 30, color: '#FFF'}}/>
                <ul className="list-rem">
                    {this.state.banner.map((item, index) => {
                        let {id,category}=item;
                        return <li className="list-var" key={index}><Link to={{
                            pathname:'/detail',
                            search: `?ID=${id}&category=${category}`
                        }}>{item.name}</Link></li>
                    })}
                </ul>
            </div>
        </header>

    }
}
export default withRouter(connect(state => ({...state.courser}), action.course)(NavTop))