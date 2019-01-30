// 数据api子系统

const port = 8090;
const express = require('express');
const category = require('./routes/admin/category.js');
const app=express();

const cors = require('cors');


app.listen(port,()=>{
	console.log('数据api子系统'+port+'.......');
})

//  中间件 cors
app.use(cors());

// 挂载路由
app.use('/admin/category',category);

