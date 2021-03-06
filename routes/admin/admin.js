const express = require('express');
const pool = require('./../../pool.js')
var router = express.Router()

// /admin

// 1. 登录
router.get('/login/:aname/:apwd', (req, res)=>{
  var aname = req.params.aname;
	var apwd = req.params.apwd;
	// console.log(aname,apwd)
  //需要对用户输入的密码执行加密函数
  pool.query('SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?)', [aname, apwd], (err, result)=>{
		if(err)throw err;
		console.log(result)
    if(result.length>0){   //查询到一行数据，登录成功
      res.send({code:200, msg:'login succ'})
    }else {   //没有查询到数据
      res.send({code:400, msg:'aname or apwd err'})
    }
  });
})


// router.get('/login/:aname/:apwd',(req,res)=>{
// 	var aname=req.params.aname;
// 	var apwd=req.params.apwd;
// 	console.log(aname,apwd)
// 	var sql = 'select aid from xfn_admin where aname=? and apwd=password(?)'
// 	pool.query(sql,[aname,apwd],(err,result)=>{
// 		if(err) throw err;
// 		console.log(result)
// 		if(result.length!=0){
// 			res.send({code:200,msg:'1'})
// 		}else{
// 			res.send({code:400,msg:'0'})
// 		}
// 	})
// })

// 2. 修改密码
 router.patch('/',(req,res)=>{
	 var data = req.body;
	 var sql = 'select aid from xfn_admin where aname=? and apwd=password(?)'
	 pool.query(sql,[data.aname,data.oldPwd],(err,result)=>{
		 if(err) throw err;
		 if(result.length!=0){
			 pool.query('update xfn_admin set apwd=password(?) where aname=?',[data.newPwd,data.aname],(err,result1)=>{
				 if(err) throw err;
				 if(result1.changedRows>0){
					 res.send({code:200,msg:'1'})
				 }else{
					 res.send({code:401,msg:'0'})
				 }
			 })
		 }else{
			 res.send({code:400,msg:'0'})
		 }
	 })
 })

module.exports=router