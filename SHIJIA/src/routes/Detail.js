import React from 'react'
import {connect} from 'react-redux'
import {Icon} from 'antd'
import {Link, withRouter} from 'react-router-dom'
import Qs from 'qs'
import{queryDetail, queryShopCart, addShopCart, removeShopCart, isLogin} from '../api/detail'

class Detail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: null,
            isCollect: false,
            isShopcart: false,
            isLogining: false,
        }
    }

    async componentDidMount() {
        let {location: {search}} = this.props,
            {ID = 0, category = ''} = Qs.parse(search.substr(1)) || {};
        let result = await queryDetail({ID, category});
        this.ID = ID;
        if (parseFloat(result.code) === 0) {
            this.setState({
                data: result.data[0]
            });
        }
        result = await isLogin();
        if (parseFloat(result.code) === 0) {
            this.setState({
                isLogining: true
            })
        }
        result = await queryShopCart();
        if (parseFloat(result.code) === 0) {
            let flag = result.data.find(item => parseFloat(item.id) === 0);
            if (flag) {
                this.setState({
                    isShopcart: true
                })
            }
        }

    }

//收藏
    collect = () => {
        let {isCollect} = this.state;
        isCollect = !isCollect;
        this.setState({
            isCollect
        })
    };
    handleCart = async () => {
        let {isShopcart, data, isLogining} = this.state;
        if (!isLogining) {
            this.props.history.push('/person/login');
            return
        }
        let result = await queryShopCart();
        if (parseFloat(result.code) !== 0)return;
        let flag = result.data.find(item => parseFloat(item.id) === 0);
        //加入购物车
        if (!flag && !isShopcart) {
            result = await addShopCart({
                courseID: data.id,
                category: data.category
            });
            if (parseFloat(result.code) === 0) {
                this.setState({
                    isShopcart: true
                });
            }
            return
        }
        //移出购物车
        if (flag && isShopcart) {
            result = await removeShopCart({
                courseID: data.id,
                category: data.category
            });
            if (parseFloat(result.code) === 0) {
                this.setState({
                    isShopcart: true
                });
            }
        }
    };
    //去支付
    goToPay = async () => {
        let {isShopcart, isLogining, data} = this.state;
        let {history} = this.props;
        if (isLogining) {
            if (!isShopcart) {
                let result = await addShopCart({
                    courseID: data.id,
                    category: data.category
                });
                if (parseFloat(result.code) !== 0)return
            }
            history.push('/shopcart/pay');
            return
        }
        history.push('/person/login')
    };

    render() {
        let {history} = this.props,
            {data, isCollect, isShopcart} = this.state;
        console.log(data);
        if (!data)return '没有这件商品！';
        let {name, pic, dec, id, price} = data;
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
                        <Icon type="star" style={isCollect ? {color: 'orange'} : null} onClick={this.collect}/>
                        <span>{isCollect ? '已经收藏' : '加入收藏'}</span>
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
                <li className="kefu"><Icon type="customer-service" style={{fontSize: '.4rem', color: 'red'}}/><p>客服</p>
                </li>
                <li className="car"><Link to='/shopcart'><Icon type="shopping-cart"
                                                               style={{fontSize: '.4rem', color: 'red'}}/><p>购物车</p>
                </Link></li>
                <li className="pay" onClick={this.goToPay}>立即购买</li>
                <li className={isShopcart ? 'remove' : 'add'}
                    onClick={this.handleCart}>{isShopcart ? '移出购物车' : '加入购物车'}</li>
            </ul>
        </div>
    }
}
export default connect()(Detail)