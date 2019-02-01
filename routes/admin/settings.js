const express = require('express');
const pool = require('./../../pool.js')
const router = express.Router()


// 获取所有的全局设置信息
router.get('/',(req,res)=>{
    var sql = 'select * from xfn_settings limit 1'  
    pool.query(sql , (err,result)=>{
        if(err) throw err;
        res.send(result[0])
    })
})

//  修改信息
router.put('/',(req,res)=>{
    var data = req.body
    var sql = 'update xfn_settings set ?'
    pool.query(sql,data,(err,result)=>{
        if(err) throw err;
        res.send({code:200,msg:'修改成功'})
    })
})

module.exports = router