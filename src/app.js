const express=require('express');
const mongoose=require('mongoose');
const port=process.env.port||3000;
const app=express();
const http=require('http');
const server=http.createServer(app);
const router=require('./routers/user');
const ejs=require('ejs');
const bodyparser=require('body-parser');
const path=require('path');

const dirPath=path.join(__dirname,'../public');
const viewPath=path.join(__dirname,'../templates/views');

//allow to access post data
app.use(bodyparser.urlencoded({extended:true}));

app.use(router);
app.set('view engine','ejs');
app.set('views',viewPath);
app.use(express.static(dirPath));

app.get('/*',(req,res)=>{
    //not found router
    res.render('error',{error:'404 page not found!'})
})

server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})





