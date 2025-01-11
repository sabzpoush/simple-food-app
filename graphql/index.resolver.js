const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const {categoryFindAll, categoryWithFood} = require('../graphql/queryies/category.query');
const {addCategory} = require('./mutation/category.mutation');
const {foodFindAll} = require('./queryies/food.query');
const {addFood} = require('./mutation/food.mutation');
const {registerUser, loginUser} = require('./mutation/auth.mutation');
const {submitOrder,deliverOrder,removeOrder} = require('./mutation/order.mutation');

const rootQuery = new GraphQLObjectType({
    name:'RootQuery',
    fields:{
        categories: categoryFindAll,
        foods:foodFindAll,
        categoriesWithFood:categoryWithFood,
    }
});

const rootMutation = new GraphQLObjectType({
    name:'RootMutation',
    fields:{
        addCategory,
        addFood,
        registerUser,
        loginUser,
        submitOrder,
        deliverOrder,
        removeOrder,
    }
});

const schema = new GraphQLSchema({
    query:rootQuery,
    mutation:rootMutation,
});

module.exports = schema; 