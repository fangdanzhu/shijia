const express = require('express'),
    route = express.Router(),
    {writeFile} = require('../utils/promiseFS'),
    STORE_PATH = './json/store.json',
    COLLECTION_PATH = './json/collection.json',
    utils = require('../utils/utils');

//=>增加购物车信息
route.post('/add', (req, res) => {
    let personID = req.session.personID,//=>登录用户的ID
        {courseID, category} = req.body;//=>传递的课程ID，我就是要把这个课程加入购物车
    courseID = parseFloat(courseID);

    //=>已经登录状态下，把信息直接存储到JSON中即可（用户在其它平台上登录，也可以从JSON中获取到数据，实现信息跨平台）
    if (personID) {
        utils.ADD_STORE(req, res, courseID, category).then(() => {
            res.send({code: 0, msg: 'OK!'});
        }).catch(() => {
            res.send({code: 1, msg: 'NO!'});
        });
        return;
    }

    //=>未登录状态下，临时存储到SESSION中(等到下一次登录成功，也要把SESSION中存储的信息，直接存储到文件中（并且清空SESSION中的信息）
    !req.session.storeList ? req.session.storeList = [] : null;
    req.session.storeList.push({courseID, category});
    res.send({code: 0, msg: 'OK!'});
});

//移除购物车商品信息
route.post('/remove', (req, res) => {
    let personID = req.session.personID;
    let obj={},removeListA=[],removeList=[];
    for(let key in req.body){
        removeListA.push(req.body[key])
    }
    removeListA.forEach((item,index)=>{
      if(index%2===0){
          obj.courseID=item;
      }else {
          obj.category=item;
          removeList.push(obj);
          obj={}
      }
    });
    if (personID) {
        //如果用户登录状态下，就先拿到该用户的所有购物车商品信息
        let newDATA=req.storeDATA.filter(item=>{
            return item.personID===parseFloat(personID);
        });

        for (let i = 0; i < newDATA.length; i++) {
            let cur = newDATA[i];
            for (let j = 0; j < removeList.length; j++) {
                let rl = removeList[j];
                if(cur.courseID==rl.courseID&&cur.category==rl.category){
                    console.log(j);
                    newDATA.splice(j,1);
                    removeList.splice(j,1);
                    i--;
                    j--;
                    break;
                }
            }
        }
        writeFile(STORE_PATH, newDATA).then(() => {
            res.send({code: 0, msg: 'OK!'});
        }).catch(() => {
            res.send({code: 1, msg: 'NO!'});
        });
        return;
    }
    !req.session.storeList ? req.session.storeList = [] : null;
    req.session.storeList = req.session.storeList.filter(item => {
        removeList.forEach(cur=>{
            return parseFloat(item.courseID) !== cur.courseID && item.category !== cur.category;
        })
    });

    for (let i = 0; i < req.session.storeList.length; i++) {
        let A=req.session.storeList[i];
        for (let j = 0; j < removeList.length; j++) {
            let B = removeList[j];
            if(parseFloat(A.courseID)===parseFloat(B.courseID)&&A.category===B.category){
                req.session.storeList.splice(j,1);
                i--;
                removeList.splice(j,1);
                j--;
                break;
            }
        }

    }
    res.send({code: 0, msg: 'OK!'});
});

//获取购物车商品信息
route.get('/info', (req, res) => {
    let state = parseFloat(req.query.state) || 0,
        personID = req.session.personID,
        storeList = [];
    if (personID) {
        //=>登录状态下是从JSON文件中获取：在STORE.JSON中找到所有personID和登录用户相同的(服务器从SESSION中可以获取用户ID的)
        req.storeDATA.forEach(item => {
            if (parseFloat(item.personID) === personID && parseFloat(item.state) === state) {
                storeList.push({
                    courseID: parseFloat(item.courseID),
                    category: item.category
                });
            }
        });
    } else {
        if (state === 0) {
            storeList = req.session.storeList || [];
            storeList = storeList.map(item => {
                return {courseID: item.courseID, category: item.category, storeID: 0};
            });
        }
    }
    let data = [];
    storeList.forEach(({courseID, category} = {}) => {
        let item = utils.queryItem(req, category).find(item => parseFloat(item.id) === courseID);
        data.push(item);
    });
    res.send({
        code: 0,
        msg: 'OK!',
        data
    });
});

//支付某个商品
route.post('/pay', (req, res) => {
    //=>把某一个课程的STATE修改为1（改完后也是需要把原始JSON文件替换的）
    let {storeID} = req.body,
        personID = req.session.personID,
        category = req.body.category,
        isUpdate = false;
    if (personID) {
        req.storeDATA = req.storeDATA.map(item => {
            if (parseFloat(item.id) === parseFloat(storeID) && parseFloat(item.personID) === parseFloat(personID) && category === item.category) {
                isUpdate = true;
                return {...item, state: 1};
            }
            return item;
        });
        if (isUpdate) {
            writeFile(STORE_PATH, req.storeDATA).then(() => {
                res.send({code: 0, msg: 'OK!'});
            }).catch(() => {
                res.send({code: 1, msg: 'NO!'});
            });
        } else {
            res.send({code: 1, msg: 'NO!'});
        }
        return;
    }
    res.send({code: 1, msg: 'NO LOGIN!'});
});

//添加到我的收藏  post 请求    参数 商品id  courseId  商品分类  category
route.post('/addClo', (req, res) => {
    let {courseId, category} = req.body,
        userId = req.session.personID,
        id = 1;
    if (req.collectionDATA.length <= 0) {
        let collectionInfo = {
            id: 1,
            userId,
            data: [
                {
                    id,
                    courseId,
                    category,
                    time: (new Date().toLocaleString())
                }
            ]
        };
        req.collectionDATA.push(collectionInfo);
        writeFile(COLLECTION_PATH, req.collectionDATA).then(() => {
            res.send({
                code: 0,
                msg: "添加成功"
            })
        }).catch(() => {
            res.send({
                code: 1,
                msg: "添加失败"
            })
        })
    } else {
        let cur = req.collectionDATA.find(item => item.userId === userId);
        if (cur) {
            id = cur.data[cur.data.length - 1].id + 1;
            let index = req.collectionDATA.findIndex(item => item.userId === userId);
            let collectionInfo = {
                id,
                courseId,
                category,
                time: (new Date().toLocaleString())
            };
            cur.data.push(collectionInfo);
            req.collectionDATA.splice(index, 1, cur);
            writeFile(COLLECTION_PATH, req.collectionDATA).then(() => {
                res.send({
                    code: 0,
                    msg: "添加成功"
                })
            }).catch(() => {
                res.send({
                    code: 1,
                    msg: "添加失败"
                })
            })
        } else {
            id = req.collectionDATA[req.collectionDATA.length - 1].id + 1;
            let collectionInfo = {
                id,
                userId,
                data: [
                    {
                        id: 1,
                        courseId,
                        category,
                        time: (new Date().toLocaleString())
                    }
                ]
            };
            req.collectionDATA.push(collectionInfo);
            writeFile(COLLECTION_PATH, req.collectionDATA).then(() => {
                console.log('A');
                res.send({
                    code: 0,
                    msg: "添加成功"
                })
            }).catch(() => {
                console.log("B");
                res.send({
                    code: 1,
                    msg: "添加失败"
                })
            })
        }
    }
});

//移除我的收藏 post  参数 商品对应的id
route.post('/removeClo',(req,res)=>{
   let userId =req.session.personID,
       {id}=req.body;
   //拿到对应用户的收藏
   let newData=req.collectionDATA.find(item=>{
       return item.userId===parseFloat(userId);
   });
   //拿到用户的收藏对应的索引
   let newIndex=req.collectionDATA.findIndex(item=>item.userId===parseFloat(userId));

   newD=newData.data.filter(item=>{
       return item.id!==parseFloat(id);
   });
   newData.data=newD;
   req.collectionDATA.splice(newIndex,1,newData);
   writeFile(COLLECTION_PATH,req.collectionDATA).then(()=>{
       res.send({
           code:0,
           msg:'移除成功'
       })
   }).catch(()=>{
       res.send({
           code:1,
           msg:'移除失败'
       })
   })
});

//获取我的收藏
route.get('/queryClo', (req, res) => {
    let userId = req.session.personID,
        data = [];
    req.collectionDATA.forEach(item => {
        if (item.userId === userId) {
            data = item.data;
        }
    });
    if (data) {
        res.send({
            code: 0,
            msg: '成功',
            data
        })
    } else {
        res.send({
            code: 1,
            msg: '失败'
        })
    }
});
module.exports = route;