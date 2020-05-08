import express = require("express");




































import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/typeDefs";
import {resolvers} from "./graphql/resolvers"


const app = express(); //my express app
const port = 9000;
app.use(bodyParser.json());
const server = new ApolloServer({ typeDefs, resolvers });// my appolo server
server.applyMiddleware({ app, path: "/api" });//specifying express app instance & graphql api



app.listen(port);
console.log(`[app] : http://localhost:${port}`);
