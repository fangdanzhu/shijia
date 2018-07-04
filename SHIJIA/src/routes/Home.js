import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import NavTop from '../component/NavTop';
import NavBottom from '../component/NavBottom';
import List from './furniture/List';
import Info from './furniture/Info';
import Suite from './furniture/Suite'
import Light from './furniture/Light'
import Textiles from './furniture/Textiles'
import '../static/css/furniture.less';

export default class Home extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <section className="furnitureBox">
            <div>
                <NavTop/>
                <Switch>
                    <Route path="/" exact component={List}/>
                    <Route path='/home/furniture/suite' component={Suite}/>
                    <Route path='/home/furniture/light' component={Light}/>
                    <Route path='/home/furniture/textiles' component={Textiles}/>
                    <Route path="/home/furniture/info" component={Info}/>
                </Switch>
                <NavBottom/>
            </div>

        </section>
    }
}