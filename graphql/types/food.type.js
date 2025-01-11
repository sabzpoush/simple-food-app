const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLInt } = require("graphql");
const {categoryType} = require('./category.type');

const foodType = new GraphQLObjectType({
    name:'FoodType',
    fields:()=>({
        _id:{type: GraphQLID},
        title:{type: GraphQLString},
        category:{type: categoryType},
        price:{type: GraphQLInt},
        inventory:{type: GraphQLInt},
    })
});

const food = `#graphql
    type Food{
        _id:ID
        title:String
        category:Category
        price:Int
        inventory:Int
    }
`;

module.exports = {
    food,
}