const express = require('express');
const pool = require('./../../pool.js')

const router = express.Router();

// /admin/category

//  1.获取菜品类别
router.get('/',(req,res)=>{
	var sql = 'select * from xfn_category order by cid'
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		res.send(result)
	})
})

//  2.删除菜品类别
router.delete('/:cid',(req,res)=>{
	var cid=req.params.cid;
	var sql2 = 'delete from xfn_category where cid=?'
	var sql1 = 'update xfn_dish set categoryId=null where categoryId=?'
	pool.query(sql1,cid,(err,result)=>{
		if(err) throw err;
		pool.query(sql2,cid,(err,result)=>{
			if(err)throw err;
			if(result.affectedRows!=0){
				res.send({code:200,msg:'删除成功'})
			}else{
				res.send({code:400,msg:'删除失败'})
			}
		})
	})
})

// 3.添加菜品类别
router.post('/',(req,res)=>{
	var data = req.body;
	var sql  = 'insert into xfn_category set ?'
	pool.query(sql,data,(err,result)=>{
		if(err) throw err;
		res.send({code:200,msg:'添加成功'})
	})
})

// 4.修改菜品类别
router.put('/',(req,res)=>{
	var data =req.body;
	var cid=data.cid;
	var sql = 'update xfn_category set ? where cid=?';
	pool.query(sql,[data,cid],(err,result)=>{
		if(err) throw err;
		if(result.changedRows!=0){
			res.send({code:200,msg:'修改成功'})
		}else if(result.affectedRows==0){
			res.send({code:400,msg:'not exits'})
		}else if(result.affectedRows==1 && result.changedRows==0){
			// 影响1行,但修改0行
			res.send({code:401,msg:'no'})
		}
	})
})





module.exports=router;