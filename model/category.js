const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    title:{
        type:String,
        required:true,
    },
    icon:{
        type:String,
        required:true,
        default:'default.png'
    },
},{id:false});

// Virtual field to populate foods related to a category
schema.virtual('foods', {
    ref: 'food',           // The model to use
    localField: '_id',     // Find foods where `localField`
    foreignField: 'category', // `foreignField` is the field in Food
});  

// Ensure virtual fields are serialized
schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

const model = mongoose.model('category',schema);

module.exports = model;