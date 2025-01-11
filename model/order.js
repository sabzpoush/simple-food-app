const mongoose = require('mongoose');

const schema = mongoose.Schema({
    food:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'food'
    },
    count:{
        type:Number,
        required:true,
        default:0,
    },
    isDelivered:{
        type:Boolean,
        required:true,
        default:false,
    },
    user:{
        type:mongoose.Types.ObjectId,
        required:true,
    },
});

const model = mongoose.model('order',schema);

module.exports = model;