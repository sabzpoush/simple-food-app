const { GraphQLNonNull, GraphQLString, GraphQLID, GraphQLIncludeDirective, GraphQLInt } = require('graphql');
const foodModel = require('../../model/food');
const { foodType } = require('../types/category.type');

const addFood = {
    type:foodType,
    args:{
        title:{type:new GraphQLNonNull(GraphQLString)},
        category:{type:new GraphQLNonNull(GraphQLID)},
        price:{type:new GraphQLNonNull(GraphQLInt)},
        inventory:{type: new GraphQLNonNull(GraphQLInt)},
    },
    resolve:async(_,args)=>{
        return await foodModel.create({
            title:args.title,
            category:args.category,
            price:args.price,
            inventory:args.inventory,
        });
    }
}

module.exports = {addFood};