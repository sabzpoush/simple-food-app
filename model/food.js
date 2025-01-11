const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:'category',
        required:true,
    },
    price:{
        type:Number,
        required:true,
        default:0,
    },
    inventory:{
        type:Number,
        required:true,
        default:1,
    },
});

const model = mongoose.model('food',schema);

module.exports = model;