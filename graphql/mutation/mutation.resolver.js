const muatation = `#graphql
    type Mutation{
        register(email:String!,password:String!):Auth!
        login(email:String!,password:String!):Auth!
        addCategory(title:String!,icon:String):Category!
        addFood(title:String!,category:ID!,price:Int!,inventory:Int!):Food!
        submitOrder(food:ID!,count:Int!):Order!
        deliverOrder(_id:ID!):Order!
        removeOrder(_id:ID!):Order!
    }
`;

module.exports = muatation;