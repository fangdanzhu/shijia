import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import List from './furniture/List';
import Info from './furniture/Info';
import Suite from './furniture/Suite'
import '../static/css/furniture.less';

export default class Home extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return <section className="furnitureBox">
             <Switch>
                 <Route path="/" exact component={List}/>
                 <Route path='/furniture/suite' component={Suite}/>
                 <Route path="/furniture/info" component={Info}/>
             </Switch>
        </section>
    }
}