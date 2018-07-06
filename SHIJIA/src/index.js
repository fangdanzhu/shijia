/*BASE*/
import React from 'react';
import ReactDOM, {render} from 'react-dom';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './store'

import axios from './api/index';
import md5 from 'blueimp-md5';


import Home from './routes/Home'
import Hotsale from './routes/Hotsale'
import Shopcart from './routes/Shopcart'
import Publish from './routes/Publish'
import Detail from './routes/Detail'

import Person from './routes/Person'

import {LocaleProvider} from 'antd'
import  zh_CN from 'antd/lib/locale-provider/zh_CN'
import 'element-theme-default'
//=>css
import './static/css/reset.min.css'
import './static/css/common.less'
import './static/css/component.less';

render(<Provider store={store}>
    <LocaleProvider locale={zh_CN}>
        <HashRouter>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/home' component={Home}/>
                <Route path='/shopcart' component={Shopcart}/>
                <Route path='/person' component={Person}/>
                <Route path='/publish' component={Publish}/>
                <Route path='/hotsale' component={Hotsale}/>
                <Route path="/detail" component={Detail}/>
            </Switch>
        </HashRouter>

    </LocaleProvider>
</Provider>, root);

