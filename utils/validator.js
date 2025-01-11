const Schema = require('validate');

const registerUserValidation = new Schema({
    email:{
        type:String,
        required:true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message:"Email is not valid!"
    },
    password:{
        type:String,
        required:true, 
        length:{min:3,max:16},
        message:"Password is not like the pattern!"
    },
});

const loginUserValidation = new Schema({
    email:{
        type:String,
        required:true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message:"Email is exist!"
    },
    password:{
        type:String,
        required:true, 
        length:{min:3,max:16},
        message:"Password is not correct!"
    },
});

module.exports = {loginUserValidation,registerUserValidation};