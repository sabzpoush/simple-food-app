const { GraphQLObjectType, GraphQLID, graphql, GraphQLString, GraphQLList } = require("graphql");
// const { foodType } = require("./food.type");


const categoryType = new GraphQLObjectType({
    name:'CategoryType',
    fields:()=>({
        _id:{type: GraphQLID},
        title:{type: GraphQLString},
        icon:{type: GraphQLString},
    })
});

const foodType = new GraphQLObjectType({
    name:'FoodType',
    fields:()=>({
        _id:{type: GraphQLID},
        title:{type: GraphQLString},
        category:{type: categoryType},
        price:{type: GraphQLID},
        inventory:{type: GraphQLID},
    })
});

const categoryFoodType = new GraphQLObjectType({
    name:'CategoryFoodType',
    fields:()=>({
        _id:{type: GraphQLID},
        title:{type: GraphQLString},
        icon:{type: GraphQLString},
        foods:{type:new GraphQLList(foodType)},
    })
});


const category = `#graphql
    type Category{
        _id:ID
        title:String
        icon:String
    }
`;

const categoryFood = `#graphql
    type CategoryFood{
        _id:ID
        title:String
        icon:String
        foods:[Food]
    }
`;

module.exports = {
    categoryType,
    categoryFoodType,
    foodType,
    category,
    categoryFood,
};