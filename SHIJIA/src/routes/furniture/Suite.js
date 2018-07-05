import React from 'react'
import {Link} from 'react-router-dom'
import {Tabs} from 'antd';
import {queryTextiels} from '../../api/detail'

class Suite extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dataItem: []
        }
    }

    async componentDidMount() {
        let data = await queryTextiels('carpet');
        if (parseFloat(data.code) === 0) {
            this.setState({dataItem: data.data})
        }
    }

    callback = async key => {
        let data = [];
        switch (key) {
            case '1':
                data = await queryTextiels('sofa');
                if (parseFloat(data.code) === 0) {
                    this.setState({dataItem: data.data})
                }
                break;
            case '2':
                data = await queryTextiels('table');
                if (parseFloat(data.code) === 0) {
                    this.setState({dataItem: data.data})
                }
                break;
            case '3':
                data = await queryTextiels('stool');
                if (parseFloat(data.code) === 0) {
                    this.setState({dataItem: data.data})
                }
                break;
            case '4':
                data = await queryTextiels('sofa');
                if (parseFloat(data.code) === 0) {
                    this.setState({dataItem: data.data})
                }
                break;
            case '5':
                this.props.history.push('/hotsale');
                break;
        }
    };

    render() {
        let TabPane = Tabs.TabPane;
        let data = this.state.dataItem;
        return <div className="textilesBox">
            <h3>家居</h3>
            <img src={require('../../static/images/jiafang.png')} alt="家纺" className="mainImg"/>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="沙发" key="1">
                    <ul>
                        {data ? data.map((item, index) => {
                            let {name, id, pic, price, category} = item;
                            return <li key={index}>
                                <Link to={{
                                    pathname: '/detail',
                                    search: `?ID=${id}&category=${category}`
                                }}>
                                    <div>
                                        <img src={pic} alt=""/>
                                    </div>
                                    <p>{name}</p>
                                    <b>￥{price}起</b>
                                </Link>
                            </li>
                        }) : ''}
                    </ul>
                </TabPane>
                <TabPane tab="桌几" key="2">
                    <ul>
                        {data ? data.map((item, index) => {
                            let {name, id, pic, price, category} = item;
                            return <li key={index}>
                                <Link to={{
                                    pathname: '/detail',
                                    search: `?ID=${id}&category=${category}`
                                }}>
                                    <div>
                                        <img src={pic} alt=""/>
                                    </div>
                                    <p>{name}</p>
                                    <b>￥{price}起</b>
                                </Link>
                            </li>
                        }) : ''}
                    </ul>
                </TabPane>
                <TabPane tab="椅子凳子" key="3">
                    <ul>
                        {data ? data.map((item, index) => {
                            let {name, id, pic, price, category} = item;
                            return <li key={index}>
                                <Link to={{
                                    pathname: '/detail',
                                    search: `?ID=${id}&category=${category}`
                                }}>
                                    <div>
                                        <img src={pic} alt=""/>
                                    </div>
                                    <p>{name}</p>
                                    <b>￥{price}起</b>
                                </Link>
                            </li>
                        }) : ''}
                    </ul>
                </TabPane>
                <TabPane tab="柜架" key="4">
                    <ul>
                        {data ? data.map((item, index) => {
                            let {name, id, pic, price, category} = item;
                            return <li key={index}>
                                <Link to={{
                                    pathname: '/detail',
                                    search: `?ID=${id}&category=${category}`
                                }}>
                                    <div>
                                        <img src={pic} alt=""/>
                                    </div>
                                    <p>{name}</p>
                                    <b>￥{price}起</b>
                                </Link>
                            </li>
                        }) : ''}
                    </ul>
                </TabPane>
                <TabPane tab='更多' key="5">
                    <ul>
                        {data ? data.map((item, index) => {
                            let {name, id, pic, price, category} = item;
                            return <li key={index}>
                                <Link to={{
                                    pathname: '/detail',
                                    search: `?ID=${id}&category=${category}`
                                }}>
                                    <div>
                                        <img src={pic} alt=""/>
                                    </div>
                                    <p>{name}</p>
                                    <b>￥{price}起</b>
                                </Link>
                            </li>
                        }) : ''}
                    </ul>
                </TabPane>
            </Tabs>
        </div>
    }
}

export default Suite