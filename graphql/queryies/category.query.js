const { GraphQLObjectType, GraphQLList } = require('graphql');
const {categoryType,categoryFoodType} = require('../types/category.type');
const categoryModel = require('../../model/category');
const foodModel = require('../../model/food');

const categoryFindAll = {
    type:new GraphQLList(categoryType),
    resolve: async()=>{
        return await categoryModel.find({}).lean();
    }
};

const categoryWithFood = {
    type:new GraphQLList(categoryFoodType),
    resolve:async()=>{
        return await categoryModel.find({}).populate('foods');
    }
};


module.exports = {categoryFindAll,categoryWithFood};