const { buildSchema } = require("graphql");
const {food} = require('../types/food.type')
const {category,categoryFood} = require('../types/category.type');
const { order, orderInput } = require('../types/order.type');
const { auth, user, role } = require('../types/auth.type');
const muatation = require('../mutation/mutation.resolver'); 
const query = require('../queryies/query.resolver');

const schema = buildSchema(`#graphql
    ${food}
    ${category}
    ${categoryFood} 
    ${order}
    ${orderInput}
    ${role}
    ${auth}
    ${user}
    ${query}
    ${muatation}

    
    schema{
        query: Query
        mutation: Mutation
    }
`);

module.exports = schema;