/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { MongoClient } from "mongodb";
require("dotenv").config();
import { Database, User, Listing, Booking } from "../lib/types";

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/test?retryWrites=true&w=majority`;
export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db("main");
  return {
    listings: db.collection<Listing>("listings"),
    users: db.collection<User>("users"),
    bookings: db.collection<Booking>("bookings"),
  };
};
