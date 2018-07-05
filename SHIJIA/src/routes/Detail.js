import React from 'react'
import {connect} from 'react-redux'
import Navhead from '../component/NavHead'
import {Icon} from 'antd'
import {Link} from 'react-router-dom'
import Qs from 'qs'
import{queryDetail} from '../api/detail'

class Detail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            data:null,
        }
    }

   async componentDidMount() {
        let {location:{search}} = this.props,
            {ID=0,category=''}=Qs.parse(search.substr(1))||{};
            this.ID=ID;
       let result=await queryDetail({ID,category});
       if (parseFloat(result.code) === 0){
           this.setState({
               data:result.data[0]
           });
       }
   }

    render() {
        let {history} = this.props,
            {data}=this.state;
        if(!data)return'';
      let  {name,pic,dec,id,price}=data;
        return <div className="detailBox">
            <div className="header">
                <Icon type="left" onClick={() => {
                    history.go(-1)
                }}/>
                {name}
            </div>
            <Link to='/hotsale' className="banner">设计师搭配组合，最高可减1299元，马上查看</Link>
            <div className="body">
                <img src={pic} alt=""/>
                <div className="body-bot clearfix">
                    <div className="left">
                        <p>{name}</p>
                        <span>Harp Sofa</span>
                        <b>￥ {price}</b>
                    </div>
                    <div className="right">
                        <Icon type="star"/>
                        <span>收藏</span>
                    </div>
                </div>
            </div>
            <p className="middle-color"></p>
            <h5 className="match-title">搭配组合</h5>
            <div className="match">
                <div className="left">
                    <img src={require('../static/images/dapei1.png')} alt=""/>
                    <p>适家蝴蝶茶几</p>
                    <p>￥ 399起</p>
                </div>
                <div className="right">
                    <img src={require('../static/images/dapei2.png')} alt=""/>
                    <p>适家盎然边桌</p>
                    <p>￥560</p>
                </div>
            </div>
            <ul className="pay-bot">
                <li className="kefu"><Icon type="customer-service"/><p>客服</p></li>
                <li className="car"><Icon type="shopping-cart"/><p>购物车</p></li>
                <li className="pay">立即购买</li>
                <li className="add">加入购物车</li>
            </ul>
        </div>
    }
}

export default connect()(Detail)