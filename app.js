const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const {createHandler} = require('graphql-http/lib/use/express');
// const schema = require('./graphql/index.resolver');
const schema = require('./graphql/schema/schema');
const foodModel = require('./model/food');
const rootValue = require('./graphql/reslover/root.resolver');
const {ApolloServer} = require('apollo-server-express');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'trusted-cdn.com'"]
    }
}));

const requestRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per windowMs
    message: 'Too many login attempts, please try again later.'
});

const database_url = process.env.database_url;
mongoose.connect(database_url);
mongoose.connection.once("open",()=>{
    console.log('database connected!');
});

// app.use('/foodapp',createHandler({schema,context:(req)=>({req})}));
// app.use('/foodapp',createHandler(
//     {
//         schema,
//         rootValue,
//     }
// ));

const typeDefs = `#graphql
    type Book{
        id:ID
        title:String
        author:String
    }

    type Query{
        books:[Book]
        book(id:ID!):Book
    }
`;

const books = [
    {
        id:"1",
        title:"Atomic habit",
        author:'Tom Cler'
    },
    {
        id:"2",
        title:"Rich dad poor dad",
        author:"Elon Musk"
    }
];

const resolvers = {
    Query:{
        books:()=>  books,
        book:(parant,args)=> books.filter((book)=> book.id == args.id),
    },
}

const startServer = async()=>{
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    })

    await server.start();

    server.applyMiddleware({app});
};

startServer();




// app.get('/',requestRateLimiter,(req,res)=>{
//     return res.status(200).json({message:'welcome!'});
// });

app.listen(4000,()=>{
    console.log('server running on http://localhost:4000/');
});