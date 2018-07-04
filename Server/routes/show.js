const express = require('express'),
    route = express.Router(),
    {writeFile} = require('../utils/promiseFS'),
    SHOW_PATH = './json/show.json',
    utils = require('../utils/utils'),
    fs=require('fs');




//上传显摆图片 （必须先注册之后） 不需要绑定事件 利用 action发送请求
route.post('/putPhoto', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
   let userId =req.session.personID;
    let file =req.file;
    if (typeof file ==='undefined'){
        res.send('no');
        return;
    }
    let photoUrl =file.destination+'/'+(Math.random()*1000).toFixed(0)+file.originalname;
    fs.rename(file.path,`${photoUrl}`,(err)=>{
        if(err){
            res.send({
                code:1,
                msg:'上传头像失败'
            });
        }else {
            let id=1;
            id=req.showDATA.length<=0?id:(req.showDATA[req.showDATA.length-1].id+1);
            let userName =req.personalDATA.find(item=>item.id===userId).userName;
            let showInfo={
                id:id,
                userId,
                userName,
                des:'',
                time:'',
                showUrl:photoUrl
            };
            req.showDATA.push(showInfo);
            writeFile(SHOW_PATH,req.showDATA).then(()=>{
                res.send({
                    code:0,
                    msg:'添加成功'
                });
            }).catch(()=>{
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
route.post('./put',(req,res)=>{
    let {cont}=req.body;
   let data= req.showDATA.reverse().find(item=>item.userId===req.session.personID);
   data.dec=cont;
   data.time=new Date().getTime().toLocaleString();
   req.showDATA.splice(data.id-1,1,data);
   req.showDATA.reverse();
   res.send({
       code:0,
       msg:'上传成功'
   });
});

//获取 显摆内容列表   参数 limit每页的条数 page第几页  model=all 返回全部数据
route.get('./showList',(req,res)=>{
   let {limit=5,page=1,model}=req.query;
   let data=[];
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