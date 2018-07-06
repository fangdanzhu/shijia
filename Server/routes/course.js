const express = require('express'),
    route = express.Router();

let fs =require('fs');
//获取轮播图
route.get('/banner', (req, res) => {
    //=>我就是把所有课程中的最后三条数据做为轮播图展示
    let data = [];
    data.push(req.courseDATAF.reverse()[0].data[0],req.courseDATAL.reverse()[0].data[1],req.courseDATAT.reverse()[0].data[2]);
    res.send({
        code: 0,
        msg: 'OK!',
        data
    });
});
//获取首页今日推荐
route.get('/tuijian',(req,res)=>{
        let data =[];
        data.push(req.courseDATAF[0].data[6],req.courseDATAF[0].data[3],req.courseDATAF[0].data[4],req.courseDATAF[1].data[5]);
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
    if(searchData.length<=0){
        res.send({
            code:1,
            msg:'暂无数据',
        });
        return;
    }
    res.send({
        code:0,
        msg:'成功获取数据',
        searchData
    })

});


module.exports = route;