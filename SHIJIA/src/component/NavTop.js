import React, {Component} from "react"
import {connect}from "react-redux"
import {withRouter, NavLink} from "react-router-dom"
import {Input,Icon} from 'antd';
import action from '../store/action/index';
import {HeadList} from "../api/couser"
const Search = Input.Search;

 class NavTop extends Component {

    constructor(props, context) {
        super(props, context)

        this.state={val:"",banner:[]}

    }
     handlChange= async (ev)=> {

            let{banner}=this.state;
            let value = ev.target.value;
            if(value){
               let result = await HeadList({cont:value});
                if(result.code===0){
                    if(result.searchData instanceof Array){
                        console.log(result.searchData);
                        this.setState({
                            banner:result.searchData
                        })
                    }

                }
            }

              }



    render(){
        return <header className="headerNavBox clearfix">
            <div className='headerbox'>
                <Icon type="minus-square-o" />
                <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{ width: 200 }} onChange={this.handlChange} valve={this.state.val}/>
                <Icon type="table" />
                <ul className="list-rem">
                {this.state.banner.map((item,index)=>{
                    return  <li className="list-var" key={index}>{item.name}</li>
                    })}
                </ul>
            </div>
        </header>

    }
}
export default withRouter(connect(state =>({...state.courser}),action.course)(NavTop))