const mongoose = require('mongoose');

const schema = mongoose.Schema({
    role:{
        type:String,
        enums:["USER","ADMIN"],
        required:true,
        default:'user',
        unique:true,
    },
    email:{
        type:String,
        required:true,
    },
    token:{
        type:String,
        required:false,
    },
    password:{
        type:String,
        required:true,
    },
});

schema.virtual('orders', {
    ref: 'order',           
    localField: '_id',     
    foreignField: 'user', 
});  

const model = mongoose.model('user',schema);

module.exports = model;