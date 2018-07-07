const express = require('express'),
    route = express.Router(),
    {writeFile} = require('../utils/promiseFS'),
    SHOW_PATH = './json/show.json',
    utils = require('../utils/utils'),
    fs=require('fs');
let ccur=null;
//上传显摆图片 （必须先注册之后） 不需要绑定事件 利用 action发送请求

//img标签的src 地址
route.get('/getShow',(req,res)=>{
    // http://localhost:8000/show/getShow?search=704.jpg
   let {search}=req.query;
   let str='../Server/photoUpload';
    let data=fs.readdirSync(str);
    res.set('Content-Type','image/jpeg');
    let url =str+"/"+search;
    data=fs.readFileSync(url);
    res.send(data)
});

//上传显摆图片
route.post('/putPhoto', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    let userId =ccur;
    let file =req.file;
    if (typeof file ==='undefined'||typeof userId ==='undefined'){
        res.send('no');
        return;
    }
    //找到 对应id的用户
    let result= req.personalDATA.find(item=>{
        return item.id===parseFloat(ccur);
    });
    //拿到用户头像地址
    let portrait=result.photoUrl;
    let userName =result.userName;
    let str1=(Math.random()*1000).toFixed(0)+file.originalname.toString();
    let photoUrl =file.destination+"/"+str1;
    let headerPhoto="http://localhost:8000/show/getShow?search="+str1;
    fs.rename(file.path,`${photoUrl}`,(err)=>{
        if(err){
            res.send({
                code:1,
                msg:'上传图片失败'
            });
        }else {
            let id=1;
            id=req.showDATA.length<=0?id:(req.showDATA[req.showDATA.length-1].id+1);
            // let ccur =req.personalDATA.find(item=>item.id===userId);
            let showInfo={
                id:id,
                userId,
                userName,
                des:'',
                time:'',
                showUrl:headerPhoto,
                userImg:portrait
            };
            req.showDATA.push(showInfo);
            writeFile(SHOW_PATH,req.showDATA).then(()=>{
                console.log("添加显摆图片成功");
                res.send({
                    code:0,
                    msg:'添加成功'
                });
            }).catch(()=>{
                console.log("添加显摆图片失败");
                res.send({
                   code:1,
                   msg:'添加失败'
               })
            });
        }
    });
    // console.log(req.file);
});
//上传显摆内容   参数 cont 显摆的内容
route.post('/put',(req,res)=>{
    let {cont}=req.body;
    if(!cont){
        ccur=req.session.personID;
        console.log(ccur);
        res.send({
            code:1
        });
        return;
    }
    //找到刚才该用户最近一条上传图片的那一套信息
    let ListData=req.showDATA.reverse();
    let data= ListData.find(item=>item.userId===req.session.personID);
    let index= ListData.findIndex(item=>item.userId===req.session.personID);
    // let result= req.personalDATA.find(item=>{
    //     return item.id===parseFloat(req.session.personID);
    // });
    // let src=result.photoUrl;
    // data.userImg=src;
   data.des=cont;
    data.time=new Date().toLocaleString();
    ListData.splice(index,1,data);
    ListData=ListData.reverse();
    writeFile(SHOW_PATH,ListData).then(()=>{
        console.log("显摆内容已经上传成功");
        res.send({
           code:0,
           msg:'上传成功'
       });
   }).catch(()=>{
        console.log("显摆内容已经上传失败");
        res.send({
           code:1,
           msg:'上传失败'
       });
   });

});

//获取 显摆内容列表   参数 limit每页的条数 page第几页  model=all 返回全部数据
route.get('/showList',(req,res)=>{
   let {limit=5,page=1,model}=req.query;
   let data=[];
    console.log(2);
    if(model==='all'){
       data=req.showDATA;
       res.send({
           code:0,
           msg:'所有数据',
           data
       });
       return;
   }
    data= req.showDATA.slice((page-1)*limit,page*limit);
   res.send({
       code:0,
       msg:'分页数据',
       data
   })
});
module.exports = route;