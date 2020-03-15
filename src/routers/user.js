const express=require('express');
require('../db/mongoose')
const User=require('./models/user');
const router=new express.Router();
const bycrypt=require('bcryptjs');
const timestamp=require('time-stamp');

router.get('/',(req,res)=>{
    //sorting by timestamps(id stores timestamp)
    sort={'_id':-1}
    User.find({}).sort(sort).then((users)=>{
        res.render('index',{users});
    }).catch((error)=>{
        res.render('error',{error});
    });
})

router.get('/create',(req,res)=>{
    //create form
    res.render('postform');
})

router.post('/postform',(req,res)=>{  
    //create    
    //console.log(req.body) 
    const name=req.body.txtUsername;
    const password=req.body.txtPassword;
    const time=timestamp.utc('DD/MM/YYYY HH:mm:ss');

    const existingUser=User.find({name});
    User.findOneAndUpdate({name},{name,password},{returnNewDocument: true}).then((user)=>{
        if(!user){
            const newUser=new User({name,password});
            newUser.save().then((result)=>{
                res.redirect('/');
            }).catch((error)=>{
                res.render('error',{error});
            });
        }
        else{
            res.redirect('/');
        }
    }).catch((error)=>{
        res.render('error',{error});
    })
})

router.post('/deleteform',(req,res)=>{
    //delete
    //console.log(Object.keys(req.body)[0])
    const _id=Object.keys(req.body)[0];
    User.findOneAndDelete({_id}).then((result)=>{
        res.redirect('/');
    }).catch((error)=>{
        res.render('error',{error});
    });
})

module.exports=router;