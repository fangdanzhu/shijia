const express = require('express'),
    route = express.Router();

let fs =require('fs');
//获取轮播图
route.get('/banner', (req, res) => {
    //=>我就是把所有课程中的最后三条数据做为轮播图展示
    let data = [];
    data.push(req.courseDATAF.reverse()[0].data[0],req.courseDATAL.reverse()[0].data[0],req.courseDATAT.reverse()[0].data[0]);
    res.send({
        code: 0,
        msg: 'OK!',
        data
    });
});
//获取首页今日推荐
route.get('/tuijian',(req,res)=>{
        let data =[];
        data.push(req.courseDATAF[0].data[0],req.courseDATAL[0].data[0],req.courseDATAT[0].data[0],req.courseDATAT[1].data[0]);
    console.log(data);
    res.send({
        code: 0,
        msg: 'OK!',
        data
    })
});

//获取商品详情信息
route.get('/info',(req,res)=>{
   let {id,category,model,page=1,limit=10} = req.query;
   let regF=/^(sofa|table|stool)$/,
       regL=/^(deskLamp|groundLamp|chandelier)$/,
       regT=/^(blanket|pillow|carpet)$/;
   let Data=[];
   page=parseFloat(page);
   limit=parseFloat(limit);
   Data=regF.test(category)?req.courseDATAF:(regL.test(category)?req.courseDATAL:regT.test(category)?req.courseDATAT:null);
   //获取所有的 对应类的所有商品信息 参数  category
   function queryAll(category) {
        let result={};
        Data.forEach(item=>{
            if(item.type===category){
                result= item.data;
            }
        });
       return result;
    }
    let data=[];
   //获取对应分类的系分类
    //如果只传入 大分类 id 和 model 没传 返回 对应大分类的所有商品信息
    if(typeof id==="undefined"&&typeof model==='undefined'&&category){
        data=queryAll(category).slice((page-1)*limit,page*limit);
        res.send({
            code:0,
            msg:'所有数据',
            limit,
            data
        });
        return;
    }
    //如果传入了 category 和model 那么返回大分类中的小分类的所有商品信息
    if(typeof id==="undefined"&&typeof model!=='undefined'&&typeof category!=='undefined' ){
        data=queryAll(category).filter(item=>parseFloat(item.type)===parseFloat(model)).slice((page-1)*limit,page*limit);
        res.send({
            code:0,
                msg:'ok',
                data
        });
        return;
    }
    //如果传入了id 和大分类的名称 那么返回 对应id的那一条详细信息
    if(typeof id!=="undefined"&&typeof category!=='undefined' ){
        data=queryAll(category).filter(item=>parseFloat(item.id)===parseFloat(id));
        res.send({
            code:0,
            msg:'ok',
            data
        });
        return;
    }
    res.send({
        code:1,
        msg:"sorry",
        data:[]
    });



});


//搜索关键字返回数据
route.get('/search',(req,res)=>{
    let {cont}=req.query;
    console.log(req.query);
    console.log(cont);
    let reg =new RegExp(cont);
    let data=[];
    req.courseDATAF.forEach(item=>{
        item.data.forEach(val=>{
            data.push(val)
        })
    });
    req.courseDATAL.forEach(item=>{
        item.data.forEach(val=>{
            data.push(val)
        })
    });
    req.courseDATAT.forEach(item=>{
        item.data.forEach(val=>{
            data.push(val)
        })
    });
    let searchData=[];
    data.forEach(item=>{
        if(reg.test(item.name)&&searchData.length<=4){
            searchData.push(item)
        }
    });
    res.send({
        searchData
    })

});
//获取头像
route.post('/photoUpload', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
        let file =req.file;
        fs.rename(file.path,`${Math.random()*2+file.originalname}`);

    // console.log(req.file);


    res.send("上传成功");
});
route.get('/photoUpload',(req,res)=>{
    let form = fs.readFileSync('C:\\Users\\Administrator\\Desktop\\shijia\\Server\\photoUpload/1b05a12295165d97f9650c55ee858426.jpeg', {encoding: 'utf8'});
    res.send(form);
});

module.exports = route;