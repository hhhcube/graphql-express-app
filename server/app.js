//import express from 'express'
const express = require('express');
// npm install graphql express-graphql
const graphqlHTTP = require('express-graphql'); // route handler
const schema = require('./schema/schema');
const mongoose = require('mongoose');
// const graphiql = require('graphiql')
// import GraphiQL from 'graphiql';
const cors = require('cors');
const app = express();
// tell app to listen to a specific port
// pass through a callback function
// so when this app starts  listen to the port
// this callback will fire and it's going to tell us 
// in the console it's listening for request
// connect to mlab mongoose database
// allow croos-origin request
app.use(cors());
mongoose.connect("mongodb://hcube:turn0n@ds133360.mlab.com:33360/learn-graph-ql")
// event listener
mongoose.connection.once('open', () =>{
    console.log('connected to database');
})
/** setting up graphql middleware contians the schema of our graph*/
app.use('/graphql', graphqlHTTP({
    // this schema describes our graph and the object types on that graph
    schema,
    graphiql: true,
    // define the data that's actally being stored in MongoDB so that MongoDB understands that data
}));
app.listen(4000, () => {
// use nodemon to run server to listen for changes
// need to run with 'nodemon' cmd instead of 'node'    
    console.log("now listening on port 4000");
});
