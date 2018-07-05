import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';


import NavBottom from '../component/NavBottom';
import List from './furniture/List';
import Suite from './furniture/Suite'
import Light from './furniture/Light'
import Textiles from './furniture/Textiles'
import '../static/css/furniture.less';

export default class Home extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div>
            <div className="furnitureBox">
                <Switch>
                    <Route path="/" exact component={List}/>
                    <Route path='/home/suite' component={Suite}/>
                    <Route path='/home/light' component={Light}/>
                    <Route path='/home/textiles' component={Textiles}/>
                </Switch>
            </div>
            <NavBottom/>
        </div>
    }
}