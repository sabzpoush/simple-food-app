const userModel = require('../model/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
require('dotenv').config();

const key = process.env['token'];

const userValidation = async (req)=>{
    if(req){
        const authorization = req.headers.authorization;
        const authHeader = authorization.split(" ")[1];

        if(authHeader){
            const verifyToken = jwt.verify(authHeader,key);
            if(!verifyToken){
                throw new Error("Token expired!");
            }
            const {_id} = jwt.decode(authHeader);
            const isValidId = mongoose.isValidObjectId(_id);
            if(!_id || !isValidId){
                throw new Error("User Token is not Valid!");
            }
            const user = await userModel.findOne({_id});
            if(!user){
                throw new Error("User Not Found!");
            }
            return user;
        }else{
            throw new Error("No Token!")
        }
    }else{
        throw new Error("Cant authoriz!");
    }
}


module.exports = {
    userValidation
};