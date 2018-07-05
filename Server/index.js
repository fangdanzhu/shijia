const CONFIG = require('./config'),
    PERSONAL_PATH = './json/personal.json',
    COURSE_PATH_FURNITURE = './json/Data/furniture.json',
    COURSE_PATH_LIGHTING = './json/Data/lighting.json',
    COURSE_PATH_TEXTILES = './json/Data/textiles.json',
    STORE_PATH = './json/store.json',
    COLLECTION_PATH = './json/collection.json',
    SHOW_PATH = './json/show.json';

/*-CREATE SERVER-*/
const express = require('express'),
    path=require('path');
    multer  = require('multer'),
    upload = multer({ dest: path.join(__dirname,'photoUpload') }),
app = express();
app.listen(CONFIG.PORT, () => {
    console.log(`THE WEB SERVICE IS CREATED SUCCESSFULLY AND IS LISTENING TO THE PORT：${CONFIG.PORT}`);
});

/*-MIDDLE WARE-*/
//=>实现CROS跨域的中间件
app.use((req, res, next) => {
    const {ALLOW_ORIGIN, CREDENTIALS, HEADERS, ALLOW_METHODS} = CONFIG.CROS;
    res.header("Access-Control-Allow-Origin", ALLOW_ORIGIN);
    res.header("Access-Control-Allow-Credentials", CREDENTIALS);
    res.header("Access-Control-Allow-Headers", HEADERS);
    res.header("Access-Control-Allow-Methods", ALLOW_METHODS);
    req.method === 'OPTIONS' ? res.send('CURRENT SERVICES SUPPORT CROSS DOMAIN REQUESTS!') : next();
});

//=>实现SESSION操作的中间件
const session = require('express-session');
app.use(session(CONFIG.session));

//=>把所有POST请求，请求主体传递的内容进行解析，把URL-ENCODED格式转换为对象，存放到REQ.BODY属性上的
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//=>在所有的请求开始之前，把JSON中的数据获取到，挂载到REQ的某些属性上，以后想获取，直接的从属性读取即可
const {readFile} = require('./utils/promiseFS');
app.use(async (req, res, next) => {
    req.personalDATA = JSON.parse(await readFile(PERSONAL_PATH));
    req.courseDATAF = JSON.parse(await readFile(COURSE_PATH_FURNITURE));
    req.courseDATAL = JSON.parse(await readFile(COURSE_PATH_LIGHTING));
    req.courseDATAT = JSON.parse(await readFile(COURSE_PATH_TEXTILES));
    req.storeDATA = JSON.parse(await readFile(STORE_PATH));
    req.collectionDATA = JSON.parse(await readFile(COLLECTION_PATH));
    req.showDATA = JSON.parse(await readFile(SHOW_PATH));
    next();
});
/*-ROUTE-*/
//=>EXPRESS中的路由管控，例如：请求的API接口地址是 '/personal/xxx' ，直接进入到 './routes/personal' 这个模块执行代码
app.use('/course', require('./routes/course'));
app.use('/person', require('./routes/person'));
app.use('/store', require('./routes/store'));
app.use('/show', require('./routes/show'));
app.use((req, res, next) => {
    res.status(404);
    res.send('NOT FOUND!');
});