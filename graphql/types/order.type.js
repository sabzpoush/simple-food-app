const { GraphQLObjectType, GraphQLInt, GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLNonNull } = require("graphql");
const {foodType} = require('./category.type')
const {userType} = require('./auth.type');

const orderType = new GraphQLObjectType({
    name:'OrderType',
    fields:()=>({
        food:{type: foodType},
        count:{type:GraphQLInt},
        isDelivered:{type:GraphQLBoolean,},
        user:{type:userType},
    }),
});

const order = `#graphql
    type Order{
        food:Food
        count:Int
        isDelivered:Boolean
        user:User
    }
`;

const orderInputType = new GraphQLInputObjectType({
    name:"OrderInputType",
    fields:{
        food:{type:new GraphQLNonNull(GraphQLID)},
        count:{type:new GraphQLNonNull(GraphQLInt)},
    },
});

const orderInput = `#graphql
    input OrderInput{
        food:ID!
        count:Int!
    }
`;

module.exports = {
    order,
    orderInput,
    orderType,
    orderInputType,
}