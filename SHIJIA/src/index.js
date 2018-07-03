/*BASE*/
import React from 'react';
import ReactDOM, {render} from 'react-dom';
import {HashRouter,Switch,Route,Redirect} from 'react-router-dom';
import {Provider} from 'react-redux'

import md5 from 'blueimp-md5';

import store from  './store'
import Home from './routes/Home'
import Shopcart from './routes/Shopcart'
import Person from './routes/Person'
import Publish from './routes/Publish'
import Hotsale from './routes/Hotsale'
//zh_CN
import {LocaleProvider} from 'antd'
import  zh_CN from 'antd/lib/locale-provider/zh_CN'
//css
import './static/css/reset.min.css'
import './static/css/common.less'



render(<Provider store={store}>
    <HashRouter>
        <LocaleProvider locale={zh_CN}>
            <div className="wrap">
                <div className="headerNavBox"></div>
                <main className="container">
                    <Switch>
                        <Route path='/' exact component={Home}/>
                        <Route path='/shopcart' component={Shopcart} />
                        <Route path='/person' component={Person} />
                        <Route path='/publish' component={Publish} />
                        <Route path='/hotsale' component={Hotsale} />
                        <Redirect to="/"/>
                    </Switch>
                </main>
                <div className="footerNavBox"></div>
            </div>
        </LocaleProvider>
    </HashRouter>
</Provider>,root);
