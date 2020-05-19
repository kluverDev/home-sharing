/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { Application } from "express";
import bodyParser from "body-parser";
require("dotenv").config();
import { connectDatabase } from "./database";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";

const mount = async (app: Application) => {
  const db = await connectDatabase();
  app.use(bodyParser.json());
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }), //provides db in all files via context
  }); // my appolo server
  server.applyMiddleware({ app, path: "/api" }); //specifying express app instance & graphql api

  const listings = await db.listings.find({}).toArray();
  console.log(listings);
  console.log(`[app] : http://localhost:${process.env.PORT}`);
};

mount(express());
