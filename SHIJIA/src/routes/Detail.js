import React from 'react'
import {connect} from 'react-redux'
import {Icon} from 'antd'
import {Link, withRouter} from 'react-router-dom'
import Qs from 'qs'
import{queryDetail, queryShopCart, addShopCart, removeShopCart, isLogin,addCollect,queryCollect} from '../api/detail'
import action from '../store/action/index'

class Detail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: null,
            isCollect: false,//判定是否收藏
            isShopcart: false,//判定是否加入购物车
            isLogining: false,//判定用户是否登录
        }
    }

    async componentDidMount() {
        let {location: {search}} = this.props,
            {ID = 0, category = ''} = Qs.parse(search.substr(1)) || {};
        //获取物品详情
        let result = await queryDetail({ID, category});
        this.ID = ID;
        if (parseFloat(result.code) === 0) {
            this.setState({
                data: result.data[0]
            });
        }
        //验证是否登录
        result = await isLogin();
        if (parseFloat(result.code) === 0) {
            this.setState({
                isLogining: true
            })
        }
        //验证是否加入购物车
        result = await queryShopCart();
        if (parseFloat(result.code) === 0) {
            let flag = result.data.find(item => {
                 let {id,category}=this.state.data;
                return  parseFloat(item.id)=== parseFloat(id)&&category===item.category
            });
            if (flag) {
                this.setState({
                    isShopcart: true
                })
            }
        }
        //检验是否已经收藏
        result=await queryCollect();
        console.log(result);
        if (parseFloat(result.code) === 0) {
            let flagCol = result.data.find(item => {
                let {id,category}=this.state.data;
                return  parseFloat(item.id)=== parseFloat(id)&&category===item.category});
            console.log(flagCol);
            if(flagCol){
                this.setState({
                    isCollect:true
                });
            }
        }
    }

//收藏
   collect = async () => {
        let {isCollect} = this.state;
        isCollect = !isCollect;
        this.setState({
            isCollect
        });
        let {id,category}=this.state.data;
       console.log(isCollect);
       if(!isCollect){
       let result=  await addCollect({
             courseId:id,
             category:category
         });
        }

    };
    handleCart = async () => {
        let {isShopcart, data, isLogining} = this.state;
        if (!isLogining) {
            this.props.history.push('/person/login');
            return
        }
        let result = await queryShopCart();
        if (parseFloat(result.code) !== 0)return;
        let flag = result.data.find(item => {
            let {id,category}=this.state.data;
            return  parseFloat(item.id)=== parseFloat(id)&&category===item.category
        });
        //加入购物车
        if (!flag) {
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
        if (flag) {
            result = await removeShopCart({
                courseID: data.id,
                category: data.category
            });
            if (parseFloat(result.code) === 0) {
                this.setState({
                    isShopcart: false
                });
            }
        }
    };
    //去支付
    goToPay = async () => {
        let {isShopcart, isLogining, data} = this.state;
        let {history,payment} = this.props;
        if (isLogining) {
            if (!isShopcart) {
                let result = await addShopCart({
                    courseID: data.id,
                    category: data.category
                });
                if (parseFloat(result.code) !== 0)return
            }
            payment([data]);
            history.push('/shopcart/pay');
            return
        }
        history.push('/person/login')
    };

    render() {
        let {history} = this.props,
            {data, isCollect, isShopcart} = this.state;
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
export default connect(state=>({...state.shopcart}),action.shopcart)(Detail)