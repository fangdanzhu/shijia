import React from 'react'
import ReactDOM from 'react-dom'
import NavBottom from '../component/NavBottom';

import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Card, Icon, Avatar ,Button} from 'antd';
import {queryIn} from "../api/push";
import "../static/css/publish.less";
const { Meta } = Card;

class Memi extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            data:[]
        }
    }
    async componentWillMount(){
        let result=await queryIn({
                model:'all'
            });
        if(parseFloat(result.code)===0){
            this.setState({data:result.data});
        }

    }
    push=()=>{
     this.props.history.push('/publish');
    }




    render() {
        if(this.state.data.length<=0)return'';
        return <section className='MEMI' >
            <header >
                <h2>觅me</h2>
                <Button className='push' type="dashed" onClick={this.push} >发布</Button>
            </header>
            <main style={{background:'#ECECEC',marginBottom:'1rem'}}>
                {this.state.data.reverse().map((item,index)=>{
                    let {showUrl,des,userName,userImg,time}=item;
                    return <Card className='MEMIBOX clearfix' key={index}>
                            <div className='userInfo'>
                                <img src={userImg} />
                                <p>{userName}</p>
                            </div>
                            <p>{des}</p>
                        <img src={showUrl} alt=""/>
                        <p>{time}</p>

                    </Card>
                })}
            </main>

            <NavBottom/>
        </section>
    }
}

export default connect()(Memi)
