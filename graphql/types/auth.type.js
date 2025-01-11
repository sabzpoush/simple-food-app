const { GraphQLObjectType, GraphQLString, GraphQLEnumType } = require("graphql");

const roleType = new GraphQLEnumType({
    name:"RoleType",
    values:{
        ADMIN:{value:"ADMIN"},
        USER:{value:"USER"}
    }
});

const role = `#graphql
    enum Role{
        ADMIN
        USER
    }
`;

const userType = new GraphQLObjectType({
    name:'UserType',
    fields:()=>({
        email:{type:GraphQLString},
        password:{type:GraphQLString},
        role:{type:roleType},
        token:{type:GraphQLString},
    }),
});

const user = `#graphql
    type User{
        email:String
        password:String
        role:Role
        token:String
    }
`;

const authType = new GraphQLObjectType({
    name:'AuthType',
    fields:()=>({
        token:{type:GraphQLString},
        user:{type:userType},
    }),
});

const auth = `#graphql
    type Auth{
        token:String
        user:User
    }
`;

module.exports = {
    authType,
    userType,
    user,
    role,
    auth
}