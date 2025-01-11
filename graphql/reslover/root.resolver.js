const categoryModel = require('../../model/category');
const foodModel = require('../../model/food');
const userModel = require('../../model/user');
const orderModel = require('../../model/order');
const {userValidation} = require('../../utils/auth');
const {loginUserValidation,registerUserValidation} = require('../../utils/validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const key = process.env.token;

const category = {
    categories:async()=>{
        return await categoryModel.find({});
    },
    categoryFood:async()=>{
        return await categoryModel.find({}).populate('foods');
    },
    addCategory:async({title,icon},req)=>{
        console.log(req);
        const user = await userValidation(req);
        if(user.role == 'USER'){
            throw new Error("You dont have an access!");
        }
        return await categoryModel.create({
            title,
            icon
        });
    },
}

const food = {
    foods:async()=>{
        return await foodModel.find({}).populate('category');
    },
    addFood:async({title,category,price,inventory})=>{
        return await foodModel.create({
            title,
            categor,
            price,
            inventory
        });
    },
}

const user = {
    register:async({email,password})=>{
        const validationResult = registerUserValidation.validate({email,password});
        if(validationResult[0]){
            throw new Error(validationResult[0].message);
        }
        const checkEmail = await userModel.findOne({email});
        if(checkEmail){
            throw new Error("User with this email already exist");
        }
        const userCount = await userModel.countDocuments();
        const role = userCount != 0 ? "USER" : "ADMIN";
        const salt = bcrypt.genSaltSync(10);
        const hashedPassowrd = bcrypt.hashSync(password,salt);
        const newUser = {email,password:hashedPassowrd,role};
        const registerUser = await userModel.create(newUser);
        const token = jwt.sign({_id:registerUser._id},key,{
            expiresIn:'7d'
        });
        const user = await userModel.findOneAndUpdate({_id:registerUser._id},{$set:{token}});
        return {token,user};
    },
    login:async({email,password})=>{
        const validationResult = loginUserValidation.validate({email,password});
        if(validationResult[0]){
            throw new Error(validationResult[0].message);
        }
 
        const checkUser = await userModel.findOne({email});
        if(!checkUser){
            throw new Error("User Not found!");
        };

        const verifyPassword = bcrypt.compareSync(password,checkUser.password);
        if(!verifyPassword){
            throw new Error ("Email or Password is wrong!");
        }

        const token = jwt.sign({_id:checkUser._id},key,{
            expiresIn:'7d'
        });

        const user = await userModel.findOneAndUpdate({email},{$set:{token}});
        return {token,user};
    },
}

const order = {
    submitOrder:async({food,count},req)=>{
        const {userId} = await userValidation(req);
        
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
    deliverOrder:async({_id})=>{
        const user = await userValidation(req);
        if(user.role != "ADMIN"){
            throw new Error("No Access!");
        };

        const order = await orderModel.findOneAndUpdate({_id},{$set:{isDelivered:true}});
        return order;
    },
    removeOrder:async({_id})=>{
        const user = await userValidation(req);
        if(user.role != "ADMIN"){
            throw new Error("No Access!");
        };

        const order = await orderModel.findOneAndDelete({_id})
            .populate('user')
            .populate('food');

        return order;
    },
};

const rootValue = {
    ...category,
    ...food,
    ...user,
    ...order,
}

module.exports = rootValue;