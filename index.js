// 数据api子系统

const port = 8090;
const express = require('express');

const app=express();

app.listen(port,()=>{
	console.log('数据api子系统'+port+'.......')
})

