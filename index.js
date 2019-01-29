// 数据api子系统

var port = 8090;
const express = require('express');

var app=express();

app.listen(port,()=>{
	console.log('....'+port+'.......')
})