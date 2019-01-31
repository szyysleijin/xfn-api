const express = require('express');
const pool = require('./../../pool.js')
const router = express.Router()

// 菜品相关接口


// 1. 获取所有菜品 
router.get('/',(req,res)=>{
    var sql = 'select cid,cname from xfn_category order by cid'// 先查询菜品类别
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        var count =0;
        var list = result;
        for(let item of list){    /* let */
            var sql ='select * from xfn_dish where categoryId=? order by did desc'
            pool.query(sql,item.cid,(err,result)=>{
                if(err) throw err;
                item.dishList=result
                count ++;
                if(count==list.length){     /* ***list.length  */
                    res.send(list)
                }
            })
        }
    })
})


// 2. 上传图片
const fs = require('fs')    //引入fs模块
const multer = require('multer')// 引入multer中间件 上传文件
var upload=multer({
    dest:'tmp/',//指定客户端上传文件的临时存储路径 临时
})

router.post('/img',upload.single('dishImg'),(req,res)=>{     //upload.array 多个上传文件
    //console.log(req.file)  //客户端上传图片
    //console.log(req.body)  提交字符串
    function random (suffix){
        var time =new Date().getTime()
        var num = Math.floor(Math.random()*(100-1)+1)      //min~max : Math.random()*(max-min)+min
        return time+num+suffix
    }
    var tmpImg=req.file.path;
    var suffix = req.file.originalname.substring( req.file.originalname.lastIndexOf('.') )  //取最后的.
    var newImg = `${random(suffix)}`   

    fs.rename(tmpImg,'img/dish/'+newImg,()=>{
        res.send({code:200,msg:'文件上传成功',fileName:newImg})
    })
})  


module.exports=router
