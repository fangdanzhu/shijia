import React from 'react';
import {connect} from 'react-redux';
import {Carousel, Icon,} from 'antd';
import {Link} from 'react-router-dom';
import action from '../../store/action/index'


class List extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {bannerData,history}=this.props;

        console.log(bannerData,history);
        return <div>
            <Carousel autoplay>
                {bannerData && bannerData.length !== 0 ? (<Carousel autoplay>
                    {bannerData.map((item, index) => {
                        let {name, pic} = item;
                        return <div key={index}>
                            <img src={pic} alt={name}/>
                        </div>;
                    })}
                </Carousel>) : ''}
                <div><a href="">1</a></div>
                <div><a href="">2</a></div>
                <div><a href="">3</a></div>
            </Carousel>
            <ul className="nav clearfix">
                <li onClick={()=>history.push('/furniture/suite')}><img src={require('../../static/images/家居.png')} alt=""/><p>家具</p></li>
                <li><img src={require('../../static/images/灯饰照明.png')} alt=""/><p>灯饰</p></li>
                <li><img src={require('../../static/images/家纺家饰.png')} alt=""/><p>家纺</p></li>
                <li><img src={require('../../static/images/软装饰品.png')} alt=""/><p>装饰</p></li>
                <li><img src={require('../../static/images/儿童.png')} alt=""/><p>儿童</p></li>
                <li><img src={require('../../static/images/笔 (1).png')} alt=""/><p>设计师</p></li>
            </ul>
            <Link to='/hotsale' className="hot-link">
                <img src={require('../../static/images/火.png')} alt=""/>
                <h4>适家头条</h4>
                <span>夏季新品上新,优惠多多!</span>
                <Icon type="right"/>
            </Link>
            <div className="recommend">
                <ul >
                    <li><img src={require('../../static/images/tui1.jpg')} alt=""/></li>
                    <li><img src={require('../../static/images/tui2.jpg')} alt=""/></li>
                    <li><img src={require('../../static/images/tui3.jpg')} alt=""/></li>
                    <li><img src={require('../../static/images/tui4.jpg')} alt=""/></li>
                    <li><img src={require('../../static/images/tui5.jpg')} alt=""/></li>
                </ul>
            </div>
            <h3 className="design-title"><i></i><span>今日推荐</span></h3>
            <ul className="recommend-body clearfix">
                <li><img src={require('../../static/images/tui1.jpg')} alt=""/></li>
                <li><img src={require('../../static/images/tui2.jpg')} alt=""/></li>
                <li><img src={require('../../static/images/tui3.jpg')} alt=""/></li>
                <li><img src={require('../../static/images/tui4.jpg')} alt=""/></li>
            </ul>
            <h3 className="design-title"><i></i><span>设计前沿</span></h3>
            <div className="design-top">
                <img src={require('../../static/images/she1.png')} alt=""/>
            </div>
            <ul className="design-bot clearfix" >
                <li><img src={require('../../static/images/she2.png')} alt=""/></li>
                <li><img src={require('../../static/images/she3.png')} alt=""/></li>
                <li><img src={require('../../static/images/she4.png')} alt=""/></li>
            </ul>
        </div>
    }


}

export default connect(state=>({...state.furniture},action.furniture))(List);