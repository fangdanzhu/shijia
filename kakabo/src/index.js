// import React from 'react';
// import ReactDOM, {render} from 'react-dom';
// import {LocaleProvider} from 'antd';
// import zh_CN from 'antd/lib/locale-provider/zh_CN';
// import './static/css/reset.min.css';
// import './static/css/component.less';
// import NavTop from './compoent/NavTop';
// import NavBottom from './compoent/NavBottom';
// import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
// render(
//     <div>
//         {/*HEADER*/}
//         <NavTop/>
//
//         <main className='container'>
//             <Switch>
//                 <Route path='/course' component={NavTop}/>
//                 <Route path='/mycourse' component={NavBottom}/>
//             </Switch>
//         </main>
//
//         FOOTER
//         <NavBottom/>
//     </div>
//     , root)
/*BASE*/
import React from 'react';
import ReactDOM, {render} from 'react-dom';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';

/*REDUX STORE*/
import {Provider} from 'react-redux';
import store from './store/index';


/*ANTD*/
import {LocaleProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';


import './static/css/reset.min.css';
import './static/css/component.less';


import NavTop from './compoent/NavTop';
import NavBottom from './compoent/NavBottom';



render(<Provider store={store}>
    <HashRouter>
        <LocaleProvider locale={zh_CN}>
            <div>
                <NavTop/>

                <NavBottom/>
            </div>
        </LocaleProvider>
    </HashRouter>
</Provider>, root);