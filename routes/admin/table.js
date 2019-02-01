const pool = require('./../../pool.js')
const express = require('express')
const router = express.Router()



router.get('/',(req,res)=>{
    var sql ='select * from xfn_table order by tid'
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

module.exports = router;