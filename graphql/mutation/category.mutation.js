const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require("graphql");
const {categoryType} = require('../types/category.type');
const categoryModel  = require('../../model/category');
const {userValidation} = require('../../utils/auth');

const addCategory = {
    type:categoryType,
    args:{
        title:{
            type:new GraphQLNonNull(GraphQLString),
        },
        icon:{
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    resolve: async(_,args,context)=>{
        const user = await userValidation(context.req);
        if(user.role == 'USER'){
            throw new Error("You dont have an access!");
        }
        return await categoryModel.create({
            title:args.title,
            icon:args.icon
        });
    }
};

module.exports = { addCategory };