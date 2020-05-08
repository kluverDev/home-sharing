/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { GraphQLSchema,GraphQLID,GraphQLFloat,GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

const query = new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => "Hello from the Query!"
      }
    }
  });
  
  const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () =>   {
            return "Hello from the Mutation!"
        }
      }
    }
  });

  const Listing = new GraphQLObjectType({
    name: "Listing",
    fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      image: { type: GraphQLString },
      address: { type: GraphQLString },
      price: { type: GraphQLInt },
      numOfGuests: { type: GraphQLInt },
      numOfBeds: { type: GraphQLInt },
      numOfBaths: { type: GraphQLInt },
      rating: { type: GraphQLFloat }
    })
  });

export const schema = new GraphQLSchema({
  query,
  mutation
});