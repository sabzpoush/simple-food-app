const { GraphQLString, GraphQLNonNull } = require('graphql');
const {authType,userType} = require('../types/auth.type');
const userModel = require('../../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {loginUserValidation,registerUserValidation} = require('../../utils/validator');
require('dotenv').config();

const key = process.env.token;

const registerUser = {
    type:authType,
    args:{
        email:{type:new GraphQLNonNull(GraphQLString)},
        password:{type:new GraphQLNonNull(GraphQLString)},
    },
    resolve:async(_,args)=>{
        const validationResult = registerUserValidation.validate(args);
        if(validationResult[0]){
            throw new Error(validationResult[0].message);
        }
        const checkEmail = await userModel.findOne({email:args.email});
        if(checkEmail){
            throw new Error("User with this email already exist");
        }
        const userCount = await userModel.countDocuments();
        const role = userCount != 0 ? "USER" : "ADMIN";
        const salt = bcrypt.genSaltSync(10);
        const hashedPassowrd = bcrypt.hashSync(args.password,salt);
        const newUser = {email:args.email,password:hashedPassowrd,role,token};
        const registerUser = await userModel.create(newUser);
        const token = jwt.sign({_id:registerUser._id},key,{
            expiresIn:'7d'
        });
        const user = await userModel.findOneAndUpdate({_id:user._id},{$set:{token}});
        return {token,user};
    },
}

const loginUser = {
    type:authType,
    args:{
        email:{type:new GraphQLNonNull(GraphQLString)},
        password:{type:new GraphQLNonNull(GraphQLString)},
    },
    resolve:async(_,args)=>{
        const validationResult = loginUserValidation.validate(args);
        if(validationResult[0]){
            throw new Error(validationResult[0].message);
        }
        const {email,password} = args;
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

module.exports = {registerUser,loginUser};