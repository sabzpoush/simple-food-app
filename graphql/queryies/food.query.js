// const { foodType } = require('../types/food.type');
const {foodType} = require('../types/category.type');
const foodModel = require('../../model/food');
const { GraphQLList } = require('graphql');

const foodFindAll = {
    type:new GraphQLList(foodType),
    resolve:async()=>{
        const foods = await foodModel
            .find({})
            .populate({path:'category',select:'_id title icon'})
            .select('_id title inventory price');
        return foods;
    }
}

module.exports = {foodFindAll};