/* eslint-disable @typescript-eslint/explicit-function-return-type */
import express, { Application } from "express";
require("dotenv").config();
import { connectDatabase } from "./database";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers/index";
import cookieParser from "cookie-parser";

const mount = async (app: Application) => {
  const db = await connectDatabase();
  app.use(cookieParser(process.env.SECRET));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ db, req, res }), //provides db in all resolvers via context
  }); // my appolo server
  server.applyMiddleware({ app, path: "/api" }); //specifying express app instance & graphql api
  app.listen(process.env.PORT);

  const listings = await db.listings.find({}).toArray();
  console.log(listings);
  console.log(`[app] : http://localhost:${process.env.PORT}`);
};

mount(express());
