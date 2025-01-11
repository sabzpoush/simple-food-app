const {orderInputType,orderType} = require('../types/order.type');
const {userValidation} = require('../../utils/auth');
const orderModel = require('../../model/order');
const { GraphQLObjectType, GraphQLNonNull, GraphQLID } = require('graphql');

const submitOrder = {
    type:orderType,
    args:{
        order:{type:orderInputType},
    },
    resolve:async(_,args,context)=>{
        const {userId} = await userValidation(context.req);
        const {food,count} = args.order;
        
        const order = await orderModel.create({
            food,
            count,
            user:userId,
        });
        
        if(!order){
            throw new Error("Can not create order!");
        }

        return await orderModel.findOne({_id:order._id})
            .populate('user')
            .populate('food');
    },
}

const deliverOrder = {
    type:orderType,
    args:{
        _id:{type:new GraphQLNonNull(GraphQLID)},
    },
    resolve:async(_,{_id},context)=>{
        const user = await userValidation(context.req);
        if(user.role != "ADMIN"){
            throw new Error("No Access!");
        };

        const order = await orderModel.findOneAndUpdate({_id},{$set:{isDelivered:true}});
        return order;
    },
};

const removeOrder = {
    type:orderType,
    args:{
        _id:{type:new GraphQLNonNull(GraphQLID)},
    },
    resolve:async(_,{_id},context)=>{
        const user = await userValidation(context.req);
        if(user.role != "ADMIN"){
            throw new Error("No Access!");
        };

        const order = await orderModel.findOneAndDelete({_id})
            .populate('user')
            .populate('food');

        return order;
    }
};

module.exports = {
    submitOrder,
    deliverOrder,
    removeOrder,
}