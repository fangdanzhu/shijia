const express = require('express'),
    route = express.Router(),
    {writeFile} = require('../utils/promiseFS'),
    PERSONAL_PATH = './json/personal.json',
    utils = require('../utils/utils'),
    fs=require('fs');
let csId=null;
//=>把临时存储在SESSION中的STORE信息，增加到JSON文件中（登录后）
function add_temp_store(req, res) {
    let storeList = req.session.storeList || [];
    if (storeList.length === 0) return;
    storeList.map(item => {
        return utils.ADD_STORE(req, res, item.courseID,item.category);
    });
    Promise.all(storeList).then(() => {
        //...
    });
    req.session.storeList = [];
}
//用户注册
route.post('/register',(req,res)=>{
    let personInfo = {
        id: req.personalDATA.length === 0 ? 1 : (parseFloat(req.personalDATA[req.personalDATA.length - 1].id) + 1),//=>用户的ID是在当前最大ID基础上自动累加1的
        userName: '',
        address:[],
        phone: '',
        passWord: '',
        photoUrl:'http://localhost:8000/show/getShow?search=default.jpg'
    };
    let Xname =req.body.userName,
        isCK=false;
    req.personalDATA.forEach(item=>{
       if(item.userName===Xname){
                    isCK=true;
       }
    });
    if(isCK){
        res.send({
            code:2,
            msg:'用户名冲突'
        });
        return;
    }
    personInfo={...personInfo,...req.body};
    req.personalDATA.push(personInfo);
    writeFile(PERSONAL_PATH,req.personalDATA).then(()=>{
        //=>注册成功也代表登录成功，所以需要记录SESSION
        csId=req.session.personID = parseFloat(personInfo.id);
        add_temp_store(req, res);//=>把存储到SESSION中的购物信息写入到JSON文件中
        res.send({
            code:0,
            msg:'ok'
        });
    }).catch(()=>{
        res.send({
            code:1,
            msg:'no'
        });
    })
});
//用户登录
route.post('/login', (req, res) => {
    let {userName, passWord} = req.body || {};
    //=>req.personalDATA 之前读取的PERSONAL中的信息：登录校验就是把用户传递的信息到总数据中查找，找到就代表登录成功...
    const item = req.personalDATA.find(item => {
        //=>支持用户名传递：姓名、邮箱、电话
        return (item.userName === userName  || item.phone === userName) && item.passWord === passWord;
    });
    if (item) {
        //=>登录成功：把当前登录用户的ID存储到SESSION上（如果SESSION上有用户信息就代表登录成功，反之没有登录）
        csId= req.session.personID = parseFloat(item.id);
        add_temp_store(req, res);//=>把存储到SESSION中的购物信息写入到JSON文件中

        res.send({code: 0, msg: 'OK!'});
        return;
    }
    res.send({code: 1, msg: 'NO!'});
});
//校验是否登录
route.get('/login', (req, res) => {
    //=>是否登录就看SESSION中是否存在（后台服务重启，SESSION都消失）

    const personID = req.session.personID;
    if (personID) {
        res.send({code: 0, msg: 'OK!'});
        return;
    }
    res.send({code: 1, msg: 'NO!'});
});
//获取个人信息
route.get('/info', (req, res) => {
    //=>获取当前登录者信息：从SESSION中获取到登录者的编号

    const personID = req.session.personID;
    if (personID) {
        //=>在所有的数据中筛选出和登录者编号相同的那一项
        let personInfo = req.personalDATA.find(item => {
            return parseFloat(item.id) === personID;
        });
        personInfo.passWord = null;//=>返回的信息中不要把密码带着
        res.send({code: 0, msg: 'OK!', data: personInfo});
        return;
    }
    res.send({code: 1, msg: 'NO!', data: null});
});
//退出登录
route.get('/out', (req, res) => {
    //=>退出登录就是干掉SESSION
    req.session.personID = null;
    csId=null;
    res.send({code: 0, msg: 'OK!'});
});
//上传头像 （必须先注册之后）
route.post('/photoUpload', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any

    let file =req.file;
    // if(typeof req.session.personID==='undefined'){
    //     console.log("AAA");
    //     // return;
    // }
    if (typeof file ==='undefined'){
        res.send('no');
        return;
    }
    // console.log(file);
    let str1=(Math.random()*1000).toFixed(0)+file.originalname.toString();
    let photoUrl =file.destination+"/"+str1;
    let headerPhoto="http://localhost:8000/show/getShow?search="+str1;
    fs.rename(file.path,`${photoUrl}`,(err)=>{
        if(err){
            res.send({
                code:1,
                msg:'上传头像失败'
            });
        }else {
           let newData= req.personalDATA.map(item=>{
                if(item.id===csId){
                    item.photoUrl=headerPhoto;
                    return item;
                }
                return item;
            });
            writeFile(PERSONAL_PATH,newData).then(result=>{
                console.log('上传头像成功');
                res.send({
                    code:0,
                    msg:'上传头像成功'
                });
            })

        }
    });

    // console.log(req.file);
});
//获取用户头像 (用户必须注册或登录之后)
route.get('/photoUpload',(req,res)=>{
   if(!req.session.personID){
       res.send({
           code:1,
           msg:'获取头像失败'
       });
       return;
   }
       let result= req.personalDATA.find(item=>{
            return item.id=parseFloat(req.session.personID);
        });
       let portrait=result.portrait;
       res.send({
           code:0,
           msg:'头像',
           portrait
       })
});
module.exports = route;