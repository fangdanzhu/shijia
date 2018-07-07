import React from 'react'
import NavBottom from '../../component/NavBottom'
import {Icon, Modal} from 'antd'
import {connect} from 'react-redux'
import {Button} from 'element-react';
import {Link} from 'react-router-dom'
import {personInfo} from '../../api/person'
import action from '../../store/action'
import {toPaying} from '../../api/shopcart'

class ShopcartPay extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            personName: '未登录'
        }
    }

    //认证是否登录
    async componentDidMount() {
        let personData = await personInfo();
        this.setState({
            personName: personData.data.userName,
            visible: false,
        })
    }

    //退出键
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = (e) => {
        this.props.history.go(-1);
        this.setState({
            visible: false,
        });
    };
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };
    //去支付
    toPay = async () => {
        let {paymentList} = this.props;
        let {id, category} = paymentList[0];
        console.log(id, category);
        let result= await toPaying({
            id, category
        });
        console.log(result);
    };

    render() {
        let {paymentList} = this.props,
            total = 0;
        paymentList.forEach(item => {
            total += item.price;
        });
        return <section className="payBox">
            <h3 className="head clearfix">
                <div>
                    <Icon type="close" className="iconTop" style={{fontSize: '.5rem'}} onClick={this.showModal}/>
                    <Modal
                        title="提示"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <p>你要关闭购物页面?</p>
                    </Modal>
                </div>

                确认订单
            </h3>
            <div className="self">
                <p>{this.state.personName}</p>
                <span>北京市朝阳区国美第一城3号院4004</span>
            </div>
            <p className="title">SJ 适家自营</p>
            <ul className="list">
                {paymentList && paymentList.length !== 0 ? paymentList.map((item, index) => {
                    let {name, id, price, dec, pic, category} = item;
                    return <li className="clearfix" key={index}>
                        <Link to={{
                            pathname: '/detail',
                            search: `?ID=${id}&category=${category}`
                        }}>
                            <img src={pic} alt=""/>
                            <div className="right clearfix">
                                <p>{name}</p>
                                <span>{dec.substr(0, 22)}</span>
                                <br/>
                                <b>￥{price}</b>
                            </div>
                        </Link>
                    </li>
                }) : <h2> -空-</h2>}
            </ul>
            <div className="peishong clearfix">
                <div className="left">
                    <h5>配送服务</h5>
                    <span>中小件送货时间</span>
                </div>
                <div className="right">
                    <h6>顺丰快递</h6>
                    <span>7-7 周六 09:00-15:00</span>
                </div>
            </div>
            <div className="tuihuan clearfix">
                <div className="left">
                    <h5>退换无忧</h5>
                    <span>自签收后7天退货,可免费上门取件</span>
                </div>
            </div>
            <div className="price">
                <div className="top clearfix">
                    <h4>商品金额</h4>
                    <span>￥{total.toFixed(2)}</span>
                </div>
                <div className="mid clearfix">
                    <h4>运费 <span>(同城免运费)</span></h4>
                    <span>￥{paymentList.length !== 0 ? 6.00 : 0.00}</span>
                </div>
                <div className="bot clearfix">
                    <h2>总价: <span>￥{paymentList.length !== 0 ? (total + 6).toFixed(2) : 0.00}</span></h2>
                </div>
                <div className="end clearfix">
                    <Button type="success" onClick={this.toPay}>微信支付</Button>
                    <Button type="info">支付宝</Button>
                </div>
            </div>
        </section>
    }
}
export default connect(state=>({...state.shopcart}),action.shopcart)(ShopcartPay)
