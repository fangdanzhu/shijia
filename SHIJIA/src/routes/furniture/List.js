import React from 'react';
import {connect} from 'react-redux';
import {Carousel, Icon,} from 'antd';
import {Carousel as Carousela} from 'element-react';
import {Link} from 'react-router-dom';
import action from '../../store/action/index'
import NavTop from '../../component/NavTop';
class List extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
  componentDidMount() {
        let {queryBanner,queryTuiJian, bannerData,tuijianData} = this.props;
        if (!bannerData||bannerData.length===0) {
             queryBanner();
        }
        if(!tuijianData||tuijianData.length===0){
            queryTuiJian();
        }
    }

    render() {
        let {bannerData,tuijianData, history} = this.props;
        return <div>
            <NavTop/>
                {bannerData && bannerData.length !== 0 ? (<Carousel autoplay>
                    {bannerData.map((item, index) => {
                        let {name, pic,id,category} = item;
                        return <div key={index}>
                            <Link to={{
                                pathname:'/detail',
                                search: `?ID=${id}&category=${category}`
                            }}>
                            <img src={pic} alt={name}/>
                            </Link>
                        </div>
                    })}
                </Carousel>) : ''}
            <ul className="nav clearfix">
                <li onClick={() => history.push('/home/suite')}>
                    <img src={require('../../static/images/家居.png')} alt=""/><p>沙发</p></li>
                <li onClick={() => history.push('/home/light')}>
                    <img src={require('../../static/images/灯饰照明.png')} alt=""/><p>灯饰</p></li>
                <li onClick={() => history.push('/home/textiles')}>
                    <img src={require('../../static/images/家纺家饰.png')} alt=""/><p>家纺</p></li>
                <li onClick={() => history.push('/home/textiles')}>
                    <img src={require('../../static/images/软装饰品.png')} alt=""/><p>装饰</p></li>
                <li onClick={() => history.push('/home/light')}>
                    <img src={require('../../static/images/儿童.png')} alt=""/><p>儿童</p></li>
                <li onClick={() => history.push('/home/suite')}>
                    <img src={require('../../static/images/笔 (1).png')} alt=""/><p>设计师</p></li>
            </ul>
            <Link to='/hotsale' className="hot-link">
                <img src={require('../../static/images/火.png')} alt=""/>
                <h4>适家头条</h4>
                <span>夏季新品上新,优惠多多!</span>
                <Icon type="right"/>
            </Link>
            <div className="recommend" >
                <div className="demo-4 medium">
                    <Carousela type="card" height="5rem" >
                        {[1,2,3,4,5].map((item, index) => {
                                return (<Carousela.Item key={index}>
                                        <li><img src={require(`../../static/images/tui${item}.jpg`)} alt=""/></li>
                                    </Carousela.Item>
                                )})}
                    </Carousela>
                </div>
            </div>
            <h3 className="design-title"><i></i><span>今日推荐</span></h3>
            <ul className="recommend-body clearfix">
                {tuijianData.map((item,index)=>{
                        let {pic,name,id,category}=item;
                   return <li key={index}>
                       <Link to={{
                           pathname:'/detail',
                           search: `?ID=${id}&category=${category}`
                       }}>
                       <img src={pic} alt={name}/>
                       </Link>
                   </li>
                })}

            </ul>
            <h3 className="design-title"><i></i><span>设计前沿</span></h3>
            <div className="design-top">
                <Link to={{
                    pathname: '/detail',
                    search: '?ID=18&category=sofa'
                }}>
                <img src={require('../../static/images/she1.png')} alt=""/>
                </Link>
            </div>
            <ul className="design-bot clearfix">
                <li>
                    <Link to={{
                        pathname: '/detail',
                        search: '?ID=5&category=sofa'
                    }}>
                        <img src={require('../../static/images/she2.png')} alt=""/>
                    </Link>
                </li>
                <li>
                    <Link to={{
                        pathname: '/detail',
                        search: '?ID=3&category=sofa'
                    }}>
                        <img src={require('../../static/images/she3.png')} alt=""/>
                    </Link>
                </li>
                <li>
                    <Link to={{
                        pathname: '/detail',
                        search: '?ID=10&category=sofa'
                    }}>
                        <img src={require('../../static/images/she4.png')} alt=""/>
                    </Link>
                </li>
            </ul>
        </div>
    }
}
export default connect(state => ({...state.furniture}), action.furniture)(List);