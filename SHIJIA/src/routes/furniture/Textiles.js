import React from 'react'
import {connect} from 'react-redux'
import {Tabs} from 'antd';

class Textiles extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    callback=(key)=> {
    console.log(key);
};
    render() {
        let TabPane = Tabs.TabPane;
        return <div className="textilesBox">
            <h3>家纺</h3>
            <img src={require('../../static/images/jiafang.png')} alt="家纺" className="mainImg"/>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="地毯" key="1">
                    <ul>
                        <li>
                            <div>
                                <img src={require('../../static/images/jiafang.png')} alt=""/>
                            </div>
                            <p>毯子</p>
                            <b>￥888起</b>
                        </li>
                        <li>
                            <div>
                                <img src={require('../../static/images/jiafang.png')} alt=""/>
                            </div>
                            <p>毯子</p>
                            <b>￥888起</b>
                        </li>
                        <li>
                            <div>
                                <img src={require('../../static/images/jiafang.png')} alt=""/>
                            </div>
                            <p>毯子</p>
                            <b>￥888起</b>
                        </li>
                        <li>
                            <div>
                                <img src={require('../../static/images/jiafang.png')} alt=""/>
                            </div>
                            <p>毯子</p>
                            <b>￥888起</b>
                        </li>
                        <li>
                            <div>
                                <img src={require('../../static/images/jiafang.png')} alt=""/>
                            </div>
                            <p>毯子</p>
                            <b>￥888起</b>
                        </li>
                        <li>
                            <div>
                                <img src={require('../../static/images/jiafang.png')} alt=""/>
                            </div>
                            <p>毯子</p>
                            <b>￥888起</b>
                        </li>
                    </ul>
                </TabPane>
                <TabPane tab="盖毯" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="床品四件套" key="3">Content of Tab Pane 3</TabPane>
                <TabPane tab="抱枕" key="4">Content of Tab Pane 3</TabPane>
                <TabPane tab="更多" key="5">Content of Tab Pane 3</TabPane>
            </Tabs>
        </div>
    }
}

export default connect()(Textiles)