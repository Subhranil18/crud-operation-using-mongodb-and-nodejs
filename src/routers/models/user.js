const mongoose=require('mongoose');
const bycrypt=require('bcryptjs');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
        trim:true,
        minlength:6
    }
},{
    timestamps:true
})


userSchema.pre('save',async function(next){
    const user=this;
    if(user.isModified('password')){
        user.password=await bycrypt.hash(user.password,8)
        //console.log(user.password)
    }
    next();
})

userSchema.pre('findOneAndUpdate',async function(next){
    const user=this;
    user._update.password=await bycrypt.hash(user._update.password,8);
    next();
})

const user=mongoose.model('users',userSchema);

module.exports=user;
